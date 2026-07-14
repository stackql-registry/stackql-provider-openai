#!/usr/bin/env node
// Applies the deterministic scope filters to the pinned OpenAI spec and writes the cleaned
// artifact consumed by split. Every removal carries a reason code; the full removal list is
// emitted as provider-dev/config/filter_report.csv. Validate-and-fail-without-writing.
//
// Scope rules (CLAUDE.md "Scope boundaries"):
//   org-admin-surface     - /organization subtree and the /projects/{id} role/group surface;
//                           separate admin key class -> the sibling openai_admin provider
//   data-plane-inference  - inference invocation (chat/completions, responses, embeddings,
//                           images, audio, moderations, realtime, completions, videos,
//                           conversation-free invocation surfaces); the anthropic/openrouter posture
//   binary-transfer       - file/skill/video/container-file content downloads and upload parts
//   alpha-unstable        - /fine_tuning/alpha graders (compute-consuming, alpha-labelled)
//   beta-ui-surface       - ChatKit session/thread surface (client-secret issuance, UI-coupled beta)
//
// Batches stay (async job control surface, not an invocation). Assistants/threads/runs stay,
// deprecation-labelled downstream. File/upload/container metadata stays.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const inPath = join(repoRoot, 'provider-dev', 'downloaded', 'openapi.yaml');
const outPath = join(repoRoot, 'provider-dev', 'downloaded', 'openapi_cleaned.yaml');
const reportPath = join(repoRoot, 'provider-dev', 'config', 'filter_report.csv');

const HTTP = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

// Ordered path rules; first match wins. `keep: true` short-circuits an earlier broad exclusion.
const RULES = [
  // binary transfer carve-outs come first so family keeps below cannot re-admit them
  { re: /^\/files\/\{file_id\}\/content$/, reason: 'binary-transfer' },
  { re: /^\/containers\/\{container_id\}\/files\/\{file_id\}\/content$/, reason: 'binary-transfer' },
  { re: /^\/vector_stores\/\{vector_store_id\}\/files\/\{file_id\}\/content$/, reason: 'binary-transfer' },
  { re: /^\/skills\/.*\/content$/, reason: 'binary-transfer' },
  { re: /^\/uploads\/\{upload_id\}\/parts$/, reason: 'binary-transfer' },

  // admin key class -> openai_admin sibling
  { re: /^\/organization(\/|$)/, reason: 'org-admin-surface' },
  { re: /^\/projects\/\{project_id\}(\/|$)/, reason: 'org-admin-surface' },

  // inference data plane (the anthropic/openrouter posture)
  { re: /^\/chat(\/|$)/, reason: 'data-plane-inference' },
  { re: /^\/completions$/, reason: 'data-plane-inference' },
  { re: /^\/responses(\/|$)/, reason: 'data-plane-inference' },
  { re: /^\/embeddings$/, reason: 'data-plane-inference' },
  { re: /^\/images(\/|$)/, reason: 'data-plane-inference' },
  { re: /^\/audio(\/|$)/, reason: 'data-plane-inference' },
  { re: /^\/moderations$/, reason: 'data-plane-inference' },
  { re: /^\/realtime(\/|$)/, reason: 'data-plane-inference' },
  { re: /^\/videos(\/|$)/, reason: 'data-plane-inference' },

  // alpha, compute-consuming
  { re: /^\/fine_tuning\/alpha(\/|$)/, reason: 'alpha-unstable' },

  // beta UI-coupled surface (client-secret issuance); revisit if it stabilises
  { re: /^\/chatkit(\/|$)/, reason: 'beta-ui-surface' },
];

const raw = readFileSync(inPath, 'utf8');
const doc = yaml.load(raw);

const preOps = Object.values(doc.paths).reduce((n, item) => n + HTTP.filter((v) => item[v]).length, 0);
const prePaths = Object.keys(doc.paths).length;

const removed = [];
for (const [path, item] of Object.entries(doc.paths)) {
  const rule = RULES.find((r) => r.re.test(path));
  if (rule) {
    const verbs = HTTP.filter((v) => item[v]).map((v) => v.toUpperCase()).join(';');
    const opIds = HTTP.filter((v) => item[v]).map((v) => item[v].operationId || '').join(';');
    removed.push({ path, verbs, opIds, reason: rule.reason });
    delete doc.paths[path];
  }
}

const postPaths = Object.keys(doc.paths).length;
const postOps = Object.values(doc.paths).reduce((n, item) => n + HTTP.filter((v) => item[v]).length, 0);

// Fail loudly if a rule matched nothing (stale rule = silent drift) - every rule must earn its place.
const usedReasons = new Set(removed.map((r) => r.reason));
const staleRules = RULES.filter((r) => !removed.some((x) => r.re.test(x.path)));
if (staleRules.length) {
  console.error(`FAIL: ${staleRules.length} filter rule(s) matched no path (stale against this spec pin); nothing written`);
  for (const r of staleRules) console.error(`  - ${r.re} (${r.reason})`);
  process.exit(1);
}

// The org-subtree filter is validated (non-negotiable 3): nothing org-scoped may survive.
const orgSurvivors = Object.keys(doc.paths).filter((p) => p.startsWith('/organization'));
if (orgSurvivors.length) {
  console.error(`FAIL: /organization paths survived the filter: ${orgSurvivors.join(', ')}; nothing written`);
  process.exit(1);
}

console.log('Validating filtered spec with @apidevtools/swagger-parser ...');
await SwaggerParser.validate(structuredClone(doc));

mkdirSync(dirname(outPath), { recursive: true });
mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(outPath, yaml.dump(doc, { noRefs: true, lineWidth: -1 }));
const csvEscape = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
writeFileSync(
  reportPath,
  ['path,verbs,operation_ids,reason', ...removed
    .sort((a, b) => a.reason.localeCompare(b.reason) || a.path.localeCompare(b.path))
    .map((r) => [r.path, r.verbs, r.opIds, r.reason].map(csvEscape).join(','))].join('\n') + '\n'
);

const removedOps = removed.reduce((n, r) => n + r.verbs.split(';').filter(Boolean).length, 0);
console.log(`Pre-filter:  ${prePaths} paths / ${preOps} operations`);
console.log(`Removed:     ${removed.length} paths / ${removedOps} operations`);
const byReason = {};
for (const r of removed) {
  const ops = r.verbs.split(';').filter(Boolean).length;
  byReason[r.reason] = byReason[r.reason] || { paths: 0, ops: 0 };
  byReason[r.reason].paths++;
  byReason[r.reason].ops += ops;
}
for (const [reason, c] of Object.entries(byReason).sort()) console.log(`  ${reason}: ${c.paths} paths / ${c.ops} ops`);
console.log(`Post-filter: ${postPaths} paths / ${postOps} operations`);
console.log(`Wrote ${outPath} and ${reportPath}`);
