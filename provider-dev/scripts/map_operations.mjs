#!/usr/bin/env node
// Populates stackql_resource_name, stackql_method_name, stackql_verb and
// stackql_object_key in provider-dev/config/all_services.csv. The rule table is
// provider-dev/config/endpoint_inventory.csv (built by build_inventory.mjs) joined
// by operationId - one deterministic source of truth for the mapping.
//
// Validations (all must pass or nothing is written):
//   - coverage both directions (every CSV op has an inventory rule; every inventory
//     rule matches a CSV op)
//   - unique (service, resource, method) keys
//   - unique path-param signatures per (service, resource, sqlVerb), exec excluded
//   - list methods carry an object key
//   - disposition consistency: every carried/renamed predecessor entry resolves to
//     a mapped (service.resource, method) produced here - no v1 survivor dangles
//
// Usage: node provider-dev/scripts/map_operations.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const cfg = (f) => path.join(repoRoot, 'provider-dev', 'config', f);
const csvPath = cfg('all_services.csv');

function parseCsvRows(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}
const csvField = (v) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const toObjects = (rows) => {
  const cols = rows[0];
  return rows.slice(1).map((r) => Object.fromEntries(cols.map((c, i) => [c, r[i] ?? ''])));
};

const inventory = toObjects(parseCsvRows(fs.readFileSync(cfg('endpoint_inventory.csv'), 'utf8')));
const dispositions = toObjects(parseCsvRows(fs.readFileSync(cfg('predecessor_dispositions.csv'), 'utf8')));

const invByOpId = new Map();
for (const r of inventory) invByOpId.set(r.operation_id, r);

const rows = parseCsvRows(fs.readFileSync(csvPath, 'utf8'));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));
for (const required of ['filename', 'path', 'verb', 'operationId', 'stackql_resource_name', 'stackql_method_name', 'stackql_verb', 'stackql_object_key']) {
  if (!(required in col)) {
    console.error(`FAIL: missing expected CSV column: ${required}`);
    process.exit(1);
  }
}

const errors = [];
const seenOpIds = new Set();
const stats = { mapped: 0, skipped: 0, exec: 0 };

for (const row of rows.slice(1)) {
  const opId = row[col.operationId];
  seenOpIds.add(opId);
  const inv = invByOpId.get(opId);
  if (!inv) {
    errors.push(`${row[col.filename]} ${row[col.verb]} ${row[col.path]}: no inventory rule for operationId ${opId}`);
    continue;
  }
  const service = row[col.filename].replace(/\.yaml$/, '');
  if (inv.service !== service) {
    errors.push(`${opId}: inventory says service ${inv.service}, split says ${service}`);
    continue;
  }
  if (inv.skip_reason) {
    row[col.stackql_resource_name] = 'skip_this_resource';
    row[col.stackql_method_name] = '';
    row[col.stackql_verb] = '';
    row[col.stackql_object_key] = '';
    stats.skipped++;
    continue;
  }
  row[col.stackql_resource_name] = inv.resource;
  row[col.stackql_method_name] = inv.method;
  row[col.stackql_verb] = inv.sql_verb;
  row[col.stackql_object_key] = inv.method === 'list' ? inv.object_key : '';
  if (inv.sql_verb === 'exec') stats.exec++; else stats.mapped++;
}

// coverage: every inventory rule must have matched a CSV row
for (const r of inventory) {
  if (!seenOpIds.has(r.operation_id)) errors.push(`inventory rule ${r.operation_id} matches no all_services.csv row`);
}

// uniqueness gates
const pathParams = (p) => (p.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1));
const methodSeen = new Map();
const sigSeen = new Map();
const mappedMethodKeys = new Set();
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  const methodKey = `${service}.${resource}.${row[col.stackql_method_name]}`;
  if (methodSeen.has(methodKey)) errors.push(`duplicate method ${methodKey} (${methodSeen.get(methodKey)} and ${row[col.path]}:${row[col.verb]})`);
  methodSeen.set(methodKey, `${row[col.path]}:${row[col.verb]}`);
  mappedMethodKeys.add(methodKey);
  const sqlVerb = row[col.stackql_verb];
  if (row[col.stackql_method_name] === 'list' && !row[col.stackql_object_key]) errors.push(`${methodKey}: list method without object key`);
  if (sqlVerb === 'exec') continue;
  const sig = pathParams(row[col.path]).sort().join(',');
  const sigKey = `${service}.${resource}.${sqlVerb}::${sig}`;
  if (sigSeen.has(sigKey)) errors.push(`signature clash on ${service}.${resource} ${sqlVerb} [${sig}] (${sigSeen.get(sigKey)} and ${row[col.stackql_method_name]})`);
  sigSeen.set(sigKey, row[col.stackql_method_name]);
}

// disposition consistency: every surviving v1 method resolves to a mapped method here
for (const d of dispositions) {
  if (d.disposition !== 'carried' && d.disposition !== 'renamed') continue;
  const key = `${d.new_fqn.replace(/^openai\./, '')}.${d.new_method}`;
  if (!mappedMethodKeys.has(key)) errors.push(`disposition ${d.old_fqn}.${d.method} -> ${key} has no mapped method`);
}

if (errors.length > 0) {
  console.error(`FAIL: ${errors.length} error(s); nothing written`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

fs.writeFileSync(csvPath, rows.map((r) => r.map(csvField).join(',')).join('\n') + '\n');

const resourcesByService = new Map();
const verbCounts = {};
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  if (!resourcesByService.has(service)) resourcesByService.set(service, new Set());
  resourcesByService.get(service).add(resource);
  verbCounts[row[col.stackql_verb]] = (verbCounts[row[col.stackql_verb]] || 0) + 1;
}
console.log(`Mapped ${stats.mapped} operations to CRUD verbs, ${stats.exec} to exec, ${stats.skipped} skipped`);
console.log('By SQL verb:', Object.entries(verbCounts).sort().map(([k, v]) => `${k} ${v}`).join(', '));
console.log('Resources per service:');
for (const [service, resources] of [...resourcesByService.entries()].sort()) {
  console.log(`  ${service}: ${resources.size} (${[...resources].sort().join(', ')})`);
}
console.log(`Total resources: ${[...resourcesByService.values()].reduce((n, s) => n + s.size, 0)}`);
