#!/usr/bin/env node
// Reads the v1 provider's generated service docs (website/docs/services/<service>/<resource>/index.md)
// and writes provider-dev/config/predecessor_inventory.csv: one row per (service, resource, method).
// Deterministic; validates fully before writing - any unparseable resource page fails the run with no output.

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const docsRoot = join(repoRoot, 'website', 'docs', 'services');
const outPath = join(repoRoot, 'provider-dev', 'config', 'predecessor_inventory.csv');

const VALID_VERBS = new Set(['SELECT', 'INSERT', 'UPDATE', 'REPLACE', 'DELETE', 'EXEC']);
const ROW_RE = /^\|\s*<CopyableCode code="([^"]*)"\s*\/>\s*\|\s*`([A-Z]+)`\s*\|\s*<CopyableCode code="([^"]*)"\s*\/>\s*\|(.*)\|\s*$/;

const errors = [];
const rows = [];

const services = readdirSync(docsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const service of services) {
  const resources = readdirSync(join(docsRoot, service), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  if (resources.length === 0) errors.push(`${service}: no resource directories`);
  for (const resource of resources) {
    const page = join(docsRoot, service, resource, 'index.md');
    let text;
    try {
      text = readFileSync(page, 'utf8');
    } catch {
      errors.push(`${service}.${resource}: missing index.md`);
      continue;
    }
    const methodsIdx = text.indexOf('## Methods');
    if (methodsIdx === -1) {
      errors.push(`${service}.${resource}: no "## Methods" section`);
      continue;
    }
    const section = text.slice(methodsIdx).split(/\n## (?!Methods)/)[0];
    const lines = section.split('\n').filter((l) => l.startsWith('|'));
    const dataLines = lines.filter((l) => !/^\|[:\s|-]+\|$/.test(l) && !/^\|\s*Name\s*\|/.test(l));
    if (dataLines.length === 0) {
      errors.push(`${service}.${resource}: Methods table has no data rows`);
      continue;
    }
    for (const line of dataLines) {
      const m = line.match(ROW_RE);
      if (!m) {
        errors.push(`${service}.${resource}: unparseable Methods row: ${line}`);
        continue;
      }
      const [, method, verb, params, desc] = m;
      if (!VALID_VERBS.has(verb)) {
        errors.push(`${service}.${resource}.${method}: unknown verb ${verb}`);
        continue;
      }
      rows.push({
        service,
        resource,
        method,
        verb,
        required_params: params.trim(),
        notes: desc.trim(),
      });
    }
  }
}

if (errors.length) {
  console.error(`FAIL: ${errors.length} validation error(s); nothing written`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const csvEscape = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const header = 'service,resource,method,verb,required_params,notes';
const body = rows.map((r) =>
  [r.service, r.resource, r.method, r.verb, r.required_params, r.notes].map(csvEscape).join(',')
);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, [header, ...body].join('\n') + '\n');

const byService = {};
const byVerb = {};
for (const r of rows) {
  byService[r.service] = (byService[r.service] || 0) + 1;
  byVerb[r.verb] = (byVerb[r.verb] || 0) + 1;
}
const resourceCount = new Set(rows.map((r) => `${r.service}.${r.resource}`)).size;
console.log(`Wrote ${rows.length} methods across ${resourceCount} resources in ${services.length} services -> ${outPath}`);
console.log('By service:');
for (const [s, n] of Object.entries(byService).sort()) console.log(`  ${s}: ${n}`);
console.log('By verb:');
for (const [v, n] of Object.entries(byVerb).sort((a, b) => b[1] - a[1])) console.log(`  ${v}: ${n}`);
