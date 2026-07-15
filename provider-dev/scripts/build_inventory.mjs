#!/usr/bin/env node
// Builds provider-dev/config/endpoint_inventory.csv over the filtered spec
// (provider-dev/downloaded/openapi_cleaned.yaml): one row per operation with the
// proposed service/resource/method/SQL-verb mapping, envelope and cursor facts,
// update-POST and async-job flags, and deprecation labelling.
// Deterministic rules; validate-and-fail-without-writing.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const inPath = join(repoRoot, 'provider-dev', 'downloaded', 'openapi_cleaned.yaml');
const outPath = join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');

const HTTP = ['get', 'post', 'delete', 'put', 'patch'];

// service by first path segment; /threads folds into the assistants family
const SERVICE_BY_SEGMENT = {
  assistants: 'assistants',
  threads: 'assistants',
  batches: 'batches',
  containers: 'containers',
  conversations: 'conversations',
  evals: 'evals',
  files: 'files',
  fine_tuning: 'fine_tuning',
  models: 'models',
  skills: 'skills',
  uploads: 'uploads',
  vector_stores: 'vector_stores',
};

// operationId -> {resource, method, verb} - explicit, exhaustive, auditable.
// Verb rules per CLAUDE.md: GET list -> SELECT .list; GET single -> SELECT .get;
// POST create -> INSERT; POST partial update -> UPDATE (update_post flagged for
// per-resource confirmation); DELETE -> DELETE; cancel/pause/resume/submit/search/
// complete -> EXEC. v1 precedent kept where sane (create_thread_and_run stays EXEC).
const OPS = {
  // assistants family (deprecation-labelled; threads/runs/messages by family rule)
  listAssistants: { resource: 'assistants', method: 'list', verb: 'select' },
  createAssistant: { resource: 'assistants', method: 'create', verb: 'insert' },
  getAssistant: { resource: 'assistants', method: 'get', verb: 'select' },
  modifyAssistant: { resource: 'assistants', method: 'update', verb: 'update', updatePost: true },
  deleteAssistant: { resource: 'assistants', method: 'delete', verb: 'delete' },
  createThread: { resource: 'threads', method: 'create', verb: 'insert' },
  getThread: { resource: 'threads', method: 'get', verb: 'select' },
  modifyThread: { resource: 'threads', method: 'update', verb: 'update', updatePost: true },
  deleteThread: { resource: 'threads', method: 'delete', verb: 'delete' },
  createThreadAndRun: { resource: 'threads', method: 'create_thread_and_run', verb: 'exec' },
  listMessages: { resource: 'messages', method: 'list', verb: 'select' },
  createMessage: { resource: 'messages', method: 'create', verb: 'insert' },
  getMessage: { resource: 'messages', method: 'get', verb: 'select' },
  modifyMessage: { resource: 'messages', method: 'update', verb: 'update', updatePost: true },
  deleteMessage: { resource: 'messages', method: 'delete', verb: 'delete' },
  listRuns: { resource: 'runs', method: 'list', verb: 'select' },
  createRun: { resource: 'runs', method: 'create', verb: 'insert', asyncJob: 'create' },
  getRun: { resource: 'runs', method: 'get', verb: 'select', asyncJob: 'poll' },
  modifyRun: { resource: 'runs', method: 'update', verb: 'update', updatePost: true },
  cancelRun: { resource: 'runs', method: 'cancel', verb: 'exec', asyncJob: 'cancel' },
  submitToolOuputsToRun: { resource: 'runs', method: 'submit_tool_outputs', verb: 'exec' },
  listRunSteps: { resource: 'run_steps', method: 'list', verb: 'select' },
  getRunStep: { resource: 'run_steps', method: 'get', verb: 'select' },

  // batches - the in-scope async boundary case
  listBatches: { resource: 'batches', method: 'list', verb: 'select' },
  createBatch: { resource: 'batches', method: 'create', verb: 'insert', asyncJob: 'create' },
  retrieveBatch: { resource: 'batches', method: 'get', verb: 'select', asyncJob: 'poll' },
  cancelBatch: { resource: 'batches', method: 'cancel', verb: 'exec', asyncJob: 'cancel' },

  // containers (code interpreter container metadata)
  ListContainers: { resource: 'containers', method: 'list', verb: 'select' },
  CreateContainer: { resource: 'containers', method: 'create', verb: 'insert' },
  RetrieveContainer: { resource: 'containers', method: 'get', verb: 'select' },
  DeleteContainer: { resource: 'containers', method: 'delete', verb: 'delete' },
  ListContainerFiles: { resource: 'files', method: 'list', verb: 'select' },
  CreateContainerFile: { resource: 'files', method: 'create', verb: 'insert', notes: 'INSERT via the non-binary file_id (reference an existing file); the optional binary file upload column is stripped in pre_normalize (any-sdk marshals JSON/XML only)' },
  RetrieveContainerFile: { resource: 'files', method: 'get', verb: 'select' },
  DeleteContainerFile: { resource: 'files', method: 'delete', verb: 'delete' },

  // conversations (Responses-family state surface; in scope per NOTES Open decision)
  createConversation: { resource: 'conversations', method: 'create', verb: 'insert' },
  getConversation: { resource: 'conversations', method: 'get', verb: 'select' },
  updateConversation: { resource: 'conversations', method: 'update', verb: 'update', updatePost: true },
  deleteConversation: { resource: 'conversations', method: 'delete', verb: 'delete' },
  listConversationItems: { resource: 'items', method: 'list', verb: 'select' },
  createConversationItems: { resource: 'items', method: 'create', verb: 'insert' },
  getConversationItem: { resource: 'items', method: 'get', verb: 'select' },
  deleteConversationItem: { resource: 'items', method: 'delete', verb: 'delete' },

  // evals
  listEvals: { resource: 'evals', method: 'list', verb: 'select' },
  createEval: { resource: 'evals', method: 'create', verb: 'insert' },
  getEval: { resource: 'evals', method: 'get', verb: 'select' },
  updateEval: { resource: 'evals', method: 'update', verb: 'update', updatePost: true },
  deleteEval: { resource: 'evals', method: 'delete', verb: 'delete' },
  getEvalRuns: { resource: 'runs', method: 'list', verb: 'select' },
  createEvalRun: { resource: 'runs', method: 'create', verb: 'insert', asyncJob: 'create' },
  getEvalRun: { resource: 'runs', method: 'get', verb: 'select', asyncJob: 'poll' },
  cancelEvalRun: { resource: 'runs', method: 'cancel', verb: 'exec', asyncJob: 'cancel' },
  deleteEvalRun: { resource: 'runs', method: 'delete', verb: 'delete' },
  getEvalRunOutputItems: { resource: 'run_output_items', method: 'list', verb: 'select' },
  getEvalRunOutputItem: { resource: 'run_output_items', method: 'get', verb: 'select' },

  // files - metadata only; create is multipart binary upload -> skipped
  listFiles: { resource: 'files', method: 'list', verb: 'select' },
  createFile: { resource: 'files', method: 'create', verb: '', skip: 'multipart-binary-body' },
  retrieveFile: { resource: 'files', method: 'get', verb: 'select' },
  deleteFile: { resource: 'files', method: 'delete', verb: 'delete' },

  // fine_tuning - the async-job archetype
  listPaginatedFineTuningJobs: { resource: 'jobs', method: 'list', verb: 'select' },
  createFineTuningJob: { resource: 'jobs', method: 'create', verb: 'insert', asyncJob: 'create' },
  retrieveFineTuningJob: { resource: 'jobs', method: 'get', verb: 'select', asyncJob: 'poll' },
  cancelFineTuningJob: { resource: 'jobs', method: 'cancel', verb: 'exec', asyncJob: 'cancel' },
  pauseFineTuningJob: { resource: 'jobs', method: 'pause', verb: 'exec', asyncJob: 'control' },
  resumeFineTuningJob: { resource: 'jobs', method: 'resume', verb: 'exec', asyncJob: 'control' },
  listFineTuningEvents: { resource: 'events', method: 'list', verb: 'select' },
  listFineTuningJobCheckpoints: { resource: 'checkpoints', method: 'list', verb: 'select' },
  listFineTuningCheckpointPermissions: { resource: 'checkpoint_permissions', method: 'list', verb: 'select' },
  createFineTuningCheckpointPermission: { resource: 'checkpoint_permissions', method: 'create', verb: 'insert' },
  deleteFineTuningCheckpointPermission: { resource: 'checkpoint_permissions', method: 'delete', verb: 'delete' },

  // models
  listModels: { resource: 'models', method: 'list', verb: 'select' },
  retrieveModel: { resource: 'models', method: 'get', verb: 'select' },
  deleteModel: { resource: 'models', method: 'delete', verb: 'delete' },

  // skills (versioned metadata CRUD; in scope per NOTES Open decision)
  ListSkills: { resource: 'skills', method: 'list', verb: 'select' },
  CreateSkill: { resource: 'skills', method: 'create', verb: '', skip: 'multipart-binary-body' },
  GetSkill: { resource: 'skills', method: 'get', verb: 'select' },
  UpdateSkillDefaultVersion: { resource: 'skills', method: 'update', verb: 'update', updatePost: true },
  DeleteSkill: { resource: 'skills', method: 'delete', verb: 'delete' },
  ListSkillVersions: { resource: 'versions', method: 'list', verb: 'select' },
  CreateSkillVersion: { resource: 'versions', method: 'create', verb: '', skip: 'multipart-binary-body' },
  GetSkillVersion: { resource: 'versions', method: 'get', verb: 'select' },
  DeleteSkillVersion: { resource: 'versions', method: 'delete', verb: 'delete' },

  // uploads - metadata lifecycle (parts are binary, filtered upstream); no GET surface
  createUpload: { resource: 'uploads', method: 'create', verb: 'insert', asyncJob: 'create' },
  completeUpload: { resource: 'uploads', method: 'complete', verb: 'exec', asyncJob: 'control' },
  cancelUpload: { resource: 'uploads', method: 'cancel', verb: 'exec', asyncJob: 'cancel' },

  // vector_stores - the CRUD flagship
  listVectorStores: { resource: 'vector_stores', method: 'list', verb: 'select' },
  createVectorStore: { resource: 'vector_stores', method: 'create', verb: 'insert' },
  getVectorStore: { resource: 'vector_stores', method: 'get', verb: 'select' },
  modifyVectorStore: { resource: 'vector_stores', method: 'update', verb: 'update', updatePost: true },
  deleteVectorStore: { resource: 'vector_stores', method: 'delete', verb: 'delete' },
  searchVectorStore: { resource: 'vector_stores', method: 'search', verb: 'exec', notes: 'embedding-consuming query; gated smoke tier' },
  listVectorStoreFiles: { resource: 'files', method: 'list', verb: 'select' },
  createVectorStoreFile: { resource: 'files', method: 'create', verb: 'insert' },
  getVectorStoreFile: { resource: 'files', method: 'get', verb: 'select' },
  updateVectorStoreFileAttributes: { resource: 'files', method: 'update', verb: 'update', updatePost: true },
  deleteVectorStoreFile: { resource: 'files', method: 'delete', verb: 'delete' },
  createVectorStoreFileBatch: { resource: 'file_batches', method: 'create', verb: 'insert', asyncJob: 'create' },
  getVectorStoreFileBatch: { resource: 'file_batches', method: 'get', verb: 'select', asyncJob: 'poll' },
  cancelVectorStoreFileBatch: { resource: 'file_batches', method: 'cancel', verb: 'exec', asyncJob: 'cancel' },
  listFilesInVectorStoreBatch: { resource: 'file_batch_files', method: 'list', verb: 'select' },
};

// the vendor flags only /assistants ops deprecated; the family rule extends the
// label to the whole assistants service (threads, messages, runs, run_steps)
const FAMILY_DEPRECATED_SERVICES = new Set(['assistants']);

const doc = yaml.load(readFileSync(inPath, 'utf8'));
const resolveRef = (ref) => ref.split('/').slice(1).reduce((o, k) => o[k], doc);

const errors = [];
const rows = [];
const seenOpIds = new Set();

for (const [path, item] of Object.entries(doc.paths)) {
  const seg = path.split('/')[1];
  const service = SERVICE_BY_SEGMENT[seg];
  if (!service) {
    errors.push(`${path}: no service rule for segment '${seg}'`);
    continue;
  }
  const pathParams = [...path.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
  for (const httpVerb of HTTP) {
    const op = item[httpVerb];
    if (!op) continue;
    const opId = op.operationId;
    if (!opId) {
      errors.push(`${httpVerb.toUpperCase()} ${path}: missing operationId`);
      continue;
    }
    if (seenOpIds.has(opId)) errors.push(`duplicate operationId ${opId}`);
    seenOpIds.add(opId);
    const rule = OPS[opId];
    if (!rule) {
      errors.push(`${opId} (${httpVerb.toUpperCase()} ${path}): no classification rule`);
      continue;
    }

    // envelope facts from the 200 response
    let envelope = '';
    let objectKey = '';
    let schema = op.responses?.['200']?.content?.['application/json']?.schema;
    if (schema?.$ref) schema = resolveRef(schema.$ref);
    const props = schema?.properties || {};
    if (Array.isArray(props.data?.type) ? props.data.type.includes('array') : props.data?.type === 'array' || props.data?.items) {
      objectKey = '$.data';
      const keys = Object.keys(props);
      envelope =
        keys.includes('first_id') && keys.includes('last_id') && keys.includes('has_more')
          ? 'list-cursor'
          : keys.includes('has_more')
            ? 'list-has_more-only'
            : 'list-plain';
    } else if (schema) {
      envelope = 'object';
    }

    const queryParams = (op.parameters || [])
      .map((p) => (p.$ref ? resolveRef(p.$ref) : p))
      .filter((p) => p.in === 'query')
      .map((p) => p.name);
    const cursorParams = queryParams.filter((q) => ['limit', 'after', 'before', 'order'].includes(q));

    const deprecated = op.deprecated ? 'spec' : FAMILY_DEPRECATED_SERVICES.has(service) ? 'family-rule' : '';

    rows.push({
      service,
      resource: rule.skip ? '' : rule.resource,
      sql_verb: rule.verb,
      method: rule.skip ? '' : rule.method,
      http_verb: httpVerb.toUpperCase(),
      path,
      operation_id: opId,
      envelope,
      object_key: rule.verb === 'select' && rule.method === 'list' ? objectKey : '',
      cursor_params: cursorParams.join(' '),
      path_params: pathParams.join(' '),
      update_post: rule.updatePost ? 'y' : '',
      async_job: rule.asyncJob || '',
      deprecated,
      skip_reason: rule.skip || '',
      notes: rule.notes || '',
    });
  }
}

// coverage both directions
for (const opId of Object.keys(OPS)) {
  if (!seenOpIds.has(opId)) errors.push(`rule for ${opId} matches no operation in the filtered spec`);
}
// list methods must carry an object key; cursor lists must declare after+limit
for (const r of rows) {
  if (r.method === 'list' && !r.object_key) errors.push(`${r.service}.${r.resource}.list (${r.operation_id}): no $.data object key`);
  if (r.method === 'list' && r.envelope === 'list-cursor' && !(r.cursor_params.includes('after') && r.cursor_params.includes('limit')))
    errors.push(`${r.operation_id}: cursor envelope without after+limit params`);
}
// unique (service, resource, method) and unique path-param signature per (service, resource, sql_verb)
const methodKeys = new Set();
const sigMap = new Map();
for (const r of rows) {
  if (r.skip_reason) continue;
  const mk = `${r.service}.${r.resource}.${r.method}`;
  if (methodKeys.has(mk)) errors.push(`duplicate method key ${mk}`);
  methodKeys.add(mk);
  if (['select', 'insert', 'update', 'delete'].includes(r.sql_verb)) {
    const sk = `${r.service}.${r.resource}.${r.sql_verb}:${r.path_params}`;
    if (sigMap.has(sk)) errors.push(`signature collision ${sk} (${sigMap.get(sk)} vs ${r.operation_id})`);
    sigMap.set(sk, r.operation_id);
  }
}
// select list/get pairs may share a verb only with distinct signatures - covered by sigMap above

if (errors.length) {
  console.error(`FAIL: ${errors.length} validation error(s); nothing written`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const cols = ['service', 'resource', 'sql_verb', 'method', 'http_verb', 'path', 'operation_id', 'envelope', 'object_key', 'cursor_params', 'path_params', 'update_post', 'async_job', 'deprecated', 'skip_reason', 'notes'];
const csvEscape = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
rows.sort((a, b) => a.service.localeCompare(b.service) || a.resource.localeCompare(b.resource) || a.path.localeCompare(b.path) || a.http_verb.localeCompare(b.http_verb));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, [cols.join(','), ...rows.map((r) => cols.map((c) => csvEscape(String(r[c]))).join(','))].join('\n') + '\n');

const mapped = rows.filter((r) => !r.skip_reason);
const count = (arr, fn) => {
  const m = {};
  for (const x of arr) {
    const k = fn(x);
    m[k] = (m[k] || 0) + 1;
  }
  return Object.entries(m).sort();
};
console.log(`Wrote ${rows.length} operations (${mapped.length} mapped, ${rows.length - mapped.length} skipped) -> ${outPath}`);
console.log(`Resources: ${new Set(mapped.map((r) => `${r.service}.${r.resource}`)).size} across ${new Set(mapped.map((r) => r.service)).size} services`);
console.log('By service (mapped):');
for (const [k, v] of count(mapped, (r) => r.service)) console.log(`  ${k}: ${v}`);
console.log('By SQL verb (mapped):');
for (const [k, v] of count(mapped, (r) => r.sql_verb)) console.log(`  ${k}: ${v}`);
console.log(`Deprecation-labelled: ${rows.filter((r) => r.deprecated).length} ops (${rows.filter((r) => r.deprecated === 'spec').length} spec-flagged, ${rows.filter((r) => r.deprecated === 'family-rule').length} family-rule)`);
console.log(`Update-POSTs: ${rows.filter((r) => r.update_post).length}; async-job ops: ${rows.filter((r) => r.async_job).length}`);
console.log('Envelope distribution (list methods):');
for (const [k, v] of count(rows.filter((r) => r.method === 'list'), (r) => r.envelope)) console.log(`  ${k}: ${v}`);
