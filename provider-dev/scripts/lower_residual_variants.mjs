#!/usr/bin/env node
// Stage 3 tail: lower any polymorphism the generic normalize leaves at a
// column-producing site (a request-body or 200-response schema root, or a direct
// property of one) to an honest relational representation.
//
// Why this is needed and safe. The provider-utils normalize renames oneOf/anyOf
// -> allOf only at component-schema roots, their direct properties, and
// request/response schema roots (shallow by design), then flattens allOf with a
// first-wins merge. That merge resolves the nullable idiom cleanly
// (`anyOf: [{realType}, {type: "null"}]` -> realType), so after normalize every
// nullable wrapper at a column site is gone. What can remain at a column site is
// therefore an irreducible union - a discriminated `oneOf` used as a field value
// (e.g. a conversation item's `environment`, either a local env or a container
// reference). A relational column cannot be a union, so it becomes a JSON-blob
// string column addressed with json_extract - the same posture normalize already
// applies to structureless objects (opaque object -> string).
//
// A union at a schema ROOT is different: normalize flattens it into a wide
// projectable schema (all members' fields merged), which is what we want, so
// roots are never lowered here. If a root still carries a raw variant keyword
// post-normalize that is a defect - the run fails loudly rather than silently
// collapsing a whole resource into one blob column.
//
// Deterministic, idempotent (a re-run finds nothing to do), and
// validate-and-fail-without-writing.
// Usage: node provider-dev/scripts/lower_residual_variants.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');
const HTTP_VERBS = ['get', 'post', 'put', 'delete', 'patch'];
const VARIANT_KEYS = ['oneOf', 'anyOf', 'allOf'];

const hasVariant = (s) => s && typeof s === 'object' && VARIANT_KEYS.some((k) => Array.isArray(s[k]));

const errors = [];
const lowered = [];

const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort();
const docs = {};

for (const filename of files) {
  const doc = yaml.load(fs.readFileSync(path.join(sourceDir, filename), 'utf8'));
  docs[filename] = doc;
  const resolve = (ref) => (typeof ref === 'string' && ref.startsWith('#/')
    ? ref.replace(/^#\//, '').split('/').reduce((o, k) => (o ? o[k] : undefined), doc)
    : undefined);
  const deref = (s) => (s && s.$ref ? resolve(s.$ref) : s);

  const lowerProperty = (propSchema, where) => {
    // preserve the human description; replace everything else with a JSON-blob column
    const description = propSchema.description;
    for (const k of Object.keys(propSchema)) delete propSchema[k];
    propSchema.type = 'string';
    propSchema.format = 'json';
    if (description) propSchema.description = description;
    lowered.push(where);
  };

  const checkSite = (rawSchema, where) => {
    const schema = deref(rawSchema);
    if (!schema || typeof schema !== 'object') return;
    if (hasVariant(schema)) {
      errors.push(`${where}: variant keyword at schema ROOT after normalize (would collapse the whole resource) - investigate, do not auto-lower`);
      return;
    }
    if (!schema.properties || typeof schema.properties !== 'object') return;
    for (const [propName, propRaw] of Object.entries(schema.properties)) {
      const prop = deref(propRaw);
      if (hasVariant(prop)) lowerProperty(prop, `${where}.${propName}`);
    }
  };

  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      const rb = op.requestBody?.content?.['application/json']?.schema;
      if (rb) checkSite(rb, `${filename} ${verb.toUpperCase()} ${pathKey} request`);
      const rs = op.responses?.['200']?.content?.['application/json']?.schema;
      if (rs) checkSite(rs, `${filename} ${verb.toUpperCase()} ${pathKey} response`);
    }
  }
}

if (errors.length) {
  console.error(`FAIL: ${errors.length} unexpected root-level variant(s); nothing written`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

for (const filename of files) {
  fs.writeFileSync(path.join(sourceDir, filename), yaml.dump(docs[filename], { lineWidth: -1, noRefs: true }), 'utf8');
}

if (lowered.length === 0) {
  console.log('No residual column-site variants; nothing to lower (normalize covered every column boundary).');
} else {
  console.log(`Lowered ${lowered.length} residual column-site union(s) to JSON-blob string columns:`);
  for (const w of lowered) console.log(`  ${w}`);
}
