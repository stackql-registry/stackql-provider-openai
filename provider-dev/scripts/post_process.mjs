#!/usr/bin/env node
// Post-generate pass over provider-dev/openapi/src/openai. Applies the one
// binding the generator cannot express on its own.
//
// request.nativeCasing: kebab
//   The optional org/project scoping headers are declared (in pre_normalize) with
//   their wire-valid lowercase kebab names, `openai-organization` /
//   `openai-project` - HTTP field names are case-insensitive (RFC 7230 s3.2), so
//   these are the same headers OpenAI documents as `OpenAI-Organization` /
//   `OpenAI-Project`. A hyphenated identifier would otherwise have to be quoted in
//   SQL (`WHERE "openai-organization" = ...`). Declaring a native wire casing lets
//   any-sdk resolve a snake_case SQL key back to the wire name via
//   casing.FromSnake(key, 'kebab') (operation_store.go GetParameter), so users can
//   write:
//
//       WHERE openai_organization = 'org-...' AND openai_project = 'proj-...'
//
//   This is additive and cannot disturb request bodies: getschemaAttributeMatcher
//   always registers the exact wire property, and only adds a snake alias when
//   ToSnake(prop) differs from it - OpenAI body properties are already snake_case,
//   so they are matched exactly as before.
//
// Deterministic, idempotent and re-runnable.
// Usage: node provider-dev/scripts/post_process.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const servicesDir = path.join(repoRoot, 'provider-dev', 'openapi', 'src', 'openai', 'v00.00.00000', 'services');
const NATIVE_CASING = 'kebab';

if (!fs.existsSync(servicesDir)) {
  console.error(`FAIL: generated services not found at ${servicesDir}; run generate-provider first`);
  process.exit(1);
}

const files = fs.readdirSync(servicesDir).filter((f) => f.endsWith('.yaml')).sort();
let methodsStamped = 0;
let filesTouched = 0;

for (const filename of files) {
  const filePath = path.join(servicesDir, filename);
  const doc = yaml.load(fs.readFileSync(filePath, 'utf8'));
  const resources = doc.components?.['x-stackQL-resources'];
  if (!resources) continue;

  let touched = 0;
  for (const resource of Object.values(resources)) {
    for (const method of Object.values(resource.methods || {})) {
      if (!method || typeof method !== 'object') continue;
      if (!method.request || typeof method.request !== 'object') method.request = {};
      if (method.request.nativeCasing !== NATIVE_CASING) {
        method.request.nativeCasing = NATIVE_CASING;
        methodsStamped++;
        touched++;
      }
    }
  }
  if (touched) {
    fs.writeFileSync(filePath, yaml.dump(doc, { lineWidth: -1, noRefs: true }), 'utf8');
    filesTouched++;
  }
}

console.log(
  methodsStamped === 0
    ? `No methods needed request.nativeCasing (already ${NATIVE_CASING}) across ${files.length} service spec(s).`
    : `Stamped request.nativeCasing: ${NATIVE_CASING} on ${methodsStamped} method(s) across ${filesTouched} of ${files.length} service spec(s).`
);
