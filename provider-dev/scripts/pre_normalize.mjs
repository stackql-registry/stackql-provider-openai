#!/usr/bin/env node
// OpenAI-specific spec adjustments applied to provider-dev/source before the
// generic `npm run normalize` pass. This is the seam for mutations the generic
// normalizer cannot infer; it runs first so its edits flow through the flatten.
//
// Job 1 (definite): inject the optional org/project scoping headers.
//   The pinned spec declares neither OpenAI-Organization nor OpenAI-Project on
//   any operation, but both are valid on every request. They are added as
//   `required: false` header parameters (the anthropic anthropic-version
//   mechanism) so they surface as optional query parameters, never in required
//   params. Injected before normalize so path-param lifting and generate carry
//   them onto every method.
//
// Job 2 (contingent): downgrade any openapi 3.1.0 construct the generic
//   normalizer or the generator cannot consume. The pinned spec does NOT use the
//   3.1 array-type nullable form (`type: [x, "null"]`) - verified at build time -
//   and its `anyOf: [{realType}, {type: "null"}]` nullable idiom flattens safely
//   under normalize's first-wins merge (the real type is always the first
//   member). So no 3.1 rewrite is needed against this pin; the guard below fails
//   the run if the array-type form ever appears in a future spec refresh, so the
//   downgrade rule is written deliberately rather than discovered in generate.
//
// Deterministic and re-runnable; validate-and-fail-without-writing.
// Usage: node provider-dev/scripts/pre_normalize.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');

const HTTP_VERBS = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'];

const ORG_PROJECT_HEADERS = [
  {
    name: 'OpenAI-Organization',
    in: 'header',
    required: false,
    description:
      'Optionally scope the request to a specific organization (overrides the default associated with the API key).',
    schema: { type: 'string' },
  },
  {
    name: 'OpenAI-Project',
    in: 'header',
    required: false,
    description:
      'Optionally scope the request to a specific project (overrides the default associated with the API key).',
    schema: { type: 'string' },
  },
];

// Guard: the array-type nullable form is the one 3.1 construct that would need a
// deterministic downgrade. Detect it so a future spec refresh cannot slip it
// past normalize silently.
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
const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort();
if (files.length === 0) errors.push('no service specs in provider-dev/source');

let headersInjected = 0;
let opsTouched = 0;
const perFile = {};

const docs = {};
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
console.log('No openapi 3.1.0 array-type nullable sites found; no downgrade needed against this pin.');
