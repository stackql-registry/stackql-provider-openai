#!/usr/bin/env node
// OpenAI-specific spec adjustments applied to provider-dev/source before the
// generic `npm run normalize` pass. This is the seam for mutations the generic
// normalizer cannot infer; it runs first so its edits flow through the flatten
// and on into generate.
//
// Job 1: inject the optional org/project scoping headers.
//   The pinned spec declares neither OpenAI-Organization nor OpenAI-Project on
//   any operation, but both are valid on every request. They are added as
//   `required: false` header parameters so they surface as optional query
//   parameters, never in required params.
//
// Job 2: carry the assistants-family deprecation, driven by the endpoint
//   inventory. The vendor flags only the five /assistants CRUD operations
//   `deprecated: true`, but the whole Assistants family (threads, messages,
//   runs, run steps) carries the migration-to-Responses deprecation. The
//   inventory records that decision per operation (the `deprecated` column,
//   `spec` or `family-rule`); this stamps `deprecated: true` on every operation
//   the inventory marks, so the label is uniform and flows into the generated
//   provider and its docs.
//
// Job 3 (contingent): downgrade any openapi 3.1.0 construct the normalizer or
//   generator cannot consume. The pinned spec does NOT use the 3.1 array-type
//   nullable form (`type: [x, "null"]`) - verified below - and its
//   `anyOf: [{realType}, {type: "null"}]` idiom flattens safely under the
//   normalizer's first-wins merge (the real type is always the first member).
//   So no rewrite is needed against this pin; the guard fails the run if the
//   array-type form ever appears in a spec refresh, so the downgrade is written
//   deliberately rather than discovered during generate.
//
// Deterministic and re-runnable; validate-and-fail-without-writing.
// Usage: node provider-dev/scripts/pre_normalize.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');
const inventoryPath = path.join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');

const HTTP_VERBS = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'];

// Declared in lowercase kebab-case, not the vendor's `OpenAI-Organization`
// spelling. HTTP field names are case-insensitive (RFC 7230 s3.2), so
// `openai-organization` is the same header on the wire, but the lowercase kebab
// form is what any-sdk's reverse-casing lookup can reach: with
// `request.nativeCasing: kebab` (stamped by post_process.mjs), a snake_case SQL
// key resolves via casing.FromSnake(key, 'kebab') -> `openai-organization`. That
// lets users write `WHERE openai_organization = '...'` unquoted, instead of
// quoting `"OpenAI-Organization"`. The botocore-derived ToSnake alias path cannot
// help here: it does not handle hyphens (ToSnake('OpenAI-Organization') yields
// the mangled 'open_ai-_organization').
const ORG_PROJECT_HEADERS = [
  {
    name: 'openai-organization',
    in: 'header',
    required: false,
    description:
      'Optionally scope the request to a specific organization (overrides the default associated with the API key). Addressable in SQL as `openai_organization`.',
    schema: { type: 'string' },
  },
  {
    name: 'openai-project',
    in: 'header',
    required: false,
    description:
      'Optionally scope the request to a specific project (overrides the default associated with the API key). Addressable in SQL as `openai_project`.',
    schema: { type: 'string' },
  },
];

// operationIds the inventory marks deprecated (spec-flagged or family-rule).
function loadDeprecatedOpIds() {
  const text = fs.readFileSync(inventoryPath, 'utf8').trim().split('\n');
  const header = text[0].split(',');
  const opIdx = header.indexOf('operation_id');
  const depIdx = header.indexOf('deprecated');
  if (opIdx === -1 || depIdx === -1) throw new Error('endpoint_inventory.csv missing operation_id/deprecated columns');
  const set = new Set();
  for (const line of text.slice(1)) {
    // no quoted commas in these two columns, simple split is safe for them
    const cols = line.split(',');
    if (cols[depIdx] && cols[depIdx].trim() !== '') set.add(cols[opIdx].trim());
  }
  return set;
}

// Guard: the array-type nullable form is the one 3.1 construct that would need a
// deterministic downgrade. Detect it so a spec refresh cannot slip it past
// normalize silently.
function findArrayTypeNullable(node, at, hits) {
  if (Array.isArray(node)) {
    node.forEach((n, i) => findArrayTypeNullable(n, `${at}[${i}]`, hits));
    return;
  }
  if (node && typeof node === 'object') {
    if (Array.isArray(node.type) && node.type.includes('null')) hits.push(at);
    for (const [k, v] of Object.entries(node)) findArrayTypeNullable(v, `${at}.${k}`, hits);
  }
}

const errors = [];
const deprecatedOpIds = loadDeprecatedOpIds();
const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort();
if (files.length === 0) errors.push('no service specs in provider-dev/source');

let headersInjected = 0;
let opsTouched = 0;
let deprecatedStamped = 0;
let binaryPropsStripped = 0;
let limitAnnotated = 0;
const perFile = {};
const docs = {};

// Appended to every `limit` query parameter description. `limit` is wired to the
// `top` query-param pushdown at generate time, so `SELECT ... LIMIT n` sets it on
// the wire; users should not hand-write `WHERE limit = n`.
const LIMIT_NOTE =
  'Automatically applied from a SQL `LIMIT` clause - `SELECT ... LIMIT 10` sends `limit=10` on the wire. Setting it explicitly in a `WHERE` clause is not required.';
const LIMIT_NOTE_RE = /Automatically applied from a SQL/;

// A request-body property is a binary upload if its schema declares
// `format: binary` anywhere (directly, in array items, or in a oneOf member).
const isBinaryProp = (v) => v && typeof v === 'object' && JSON.stringify(v).includes('"binary"');

// Strip binary upload properties from a request-body schema. any-sdk marshals
// only JSON/XML request bodies (operation_store.go marshalBody), so a binary
// property is never a functional column/param. Remove it and drop it from
// `required`. Operations whose sole body is a required binary upload with no
// non-binary alternative are skipped at the inventory level; this cleans the rest
// (e.g. container file create stays usable via the non-binary file_id).
function stripBinaryFromSchema(schema, resolve, seen) {
  const s = schema && schema.$ref ? resolve(schema.$ref) : schema;
  if (!s || typeof s !== 'object' || !s.properties || seen.has(s)) return 0;
  seen.add(s);
  let removed = 0;
  for (const [k, v] of Object.entries(s.properties)) {
    if (isBinaryProp(v)) {
      delete s.properties[k];
      if (Array.isArray(s.required)) s.required = s.required.filter((r) => r !== k);
      removed++;
    }
  }
  return removed;
}

for (const filename of files) {
  const filePath = path.join(sourceDir, filename);
  const doc = yaml.load(fs.readFileSync(filePath, 'utf8'));
  docs[filename] = doc;

  const nullHits = [];
  findArrayTypeNullable(doc.paths || {}, 'paths', nullHits);
  findArrayTypeNullable(doc.components || {}, 'components', nullHits);
  if (nullHits.length) {
    errors.push(`${filename}: ${nullHits.length} array-type nullable site(s) (3.1 downgrade rule needed): ${nullHits.slice(0, 3).join(', ')}${nullHits.length > 3 ? ' ...' : ''}`);
  }

  let fileHeaders = 0;
  for (const [, pathItem] of Object.entries(doc.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op || typeof op !== 'object') continue;

      if (!Array.isArray(op.parameters)) op.parameters = [];
      const present = new Set(op.parameters.filter((p) => p && p.in === 'header').map((p) => p.name));
      let added = 0;
      for (const h of ORG_PROJECT_HEADERS) {
        if (!present.has(h.name)) {
          op.parameters.push(structuredClone(h));
          added++;
        }
      }
      if (added) {
        opsTouched++;
        fileHeaders += added;
        headersInjected += added;
      }

      if (op.operationId && deprecatedOpIds.has(op.operationId) && op.deprecated !== true) {
        op.deprecated = true;
        deprecatedStamped++;
      }

      // Annotate the `limit` query parameter: it is the page-size parameter wired
      // to the `top` query-param pushdown at generate time, so a SQL LIMIT clause
      // supplies it automatically. The docs drop it from the example WHERE clauses
      // (sanitize_docs.mjs) but keep the row in the params table, where this note
      // is what the reader sees.
      for (const p of op.parameters) {
        const param = p && p.$ref ? undefined : p;
        if (param && param.in === 'query' && param.name === 'limit' && !LIMIT_NOTE_RE.test(param.description || '')) {
          param.description = `${(param.description || '').trim()}\n\n${LIMIT_NOTE}`.trim();
          limitAnnotated++;
        }
      }

      const content = op.requestBody?.content;
      if (content && typeof content === 'object') {
        const resolve = (ref) => ref.replace(/^#\//, '').split('/').reduce((o, kk) => (o ? o[kk] : undefined), doc);
        const seen = new Set();
        for (const mt of Object.values(content)) {
          if (mt?.schema) binaryPropsStripped += stripBinaryFromSchema(mt.schema, resolve, seen);
        }
      }
    }
  }
  perFile[filename] = fileHeaders;
}

if (errors.length) {
  console.error(`FAIL: ${errors.length} pre-normalize issue(s); nothing written`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

for (const filename of files) {
  fs.writeFileSync(path.join(sourceDir, filename), yaml.dump(docs[filename], { lineWidth: -1, noRefs: true }), 'utf8');
}

console.log(`Injected ${headersInjected} org/project header parameter(s) across ${opsTouched} operations in ${files.length} spec(s):`);
for (const [f, n] of Object.entries(perFile).sort()) console.log(`  ${f}: ${n}`);
console.log(`Stamped deprecated: true on ${deprecatedStamped} operation(s) not already flagged upstream (${deprecatedOpIds.size} deprecated per the inventory).`);
console.log(`Stripped ${binaryPropsStripped} binary (format:binary) request-body property(ies) - not marshalable by any-sdk (JSON/XML only).`);
console.log(`Annotated ${limitAnnotated} \`limit\` query parameter(s) as SQL-LIMIT driven (the top pushdown).`);
console.log('No openapi 3.1.0 array-type nullable sites found; no downgrade needed against this pin.');
