#!/usr/bin/env node
// Acquires the canonical OpenAI OpenAPI artifact (openapi.yaml on openai/openai-openapi),
// validates it with @apidevtools/swagger-parser, and pins (source, ref, date, sha256) in
// provider-dev/config/spec_pin.json. Validate-and-fail-without-writing: nothing is persisted
// unless download + parse + validate all succeed.
//
// Usage:
//   node fetch_spec.mjs            # resolve current main HEAD, download, validate, pin, save
//   node fetch_spec.mjs --ref SHA  # fetch a specific commit
//   node fetch_spec.mjs --check    # re-resolve main HEAD and compare against the recorded pin (drift CI)

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const pinPath = join(repoRoot, 'provider-dev', 'config', 'spec_pin.json');
const specPath = join(repoRoot, 'provider-dev', 'downloaded', 'openapi.yaml');

const OWNER = 'openai';
const REPO = 'openai-openapi';
const BRANCH = 'main';
const FILE = 'openapi.yaml';

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

async function ghJson(url) {
  const res = await fetch(url, { headers: { accept: 'application/vnd.github+json', 'user-agent': 'stackql-provider-openai' } });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json();
}

async function resolveHead() {
  const b = await ghJson(`https://api.github.com/repos/${OWNER}/${REPO}/branches/${BRANCH}`);
  return { sha: b.commit.sha, date: b.commit.commit.committer.date };
}

async function main() {
  if (args.includes('--check')) {
    if (!existsSync(pinPath)) {
      console.error('FAIL: no spec_pin.json to check against');
      process.exit(1);
    }
    const pin = JSON.parse(readFileSync(pinPath, 'utf8'));
    const head = await resolveHead();
    if (head.sha === pin.ref) {
      console.log(`OK: ${BRANCH} HEAD matches pin ${pin.ref}`);
      return;
    }
    console.error(`DRIFT: ${BRANCH} HEAD is ${head.sha} (${head.date}); pin is ${pin.ref} (${pin.ref_date})`);
    console.error('Refreshes are reviewed diffs: re-run fetch with --ref, diff provider-dev/downloaded/openapi.yaml, review, commit.');
    process.exit(2);
  }

  let ref = getArg('--ref');
  let refDate = null;
  if (ref) {
    const c = await ghJson(`https://api.github.com/repos/${OWNER}/${REPO}/commits/${ref}`);
    ref = c.sha;
    refDate = c.commit.committer.date;
  } else {
    const head = await resolveHead();
    ref = head.sha;
    refDate = head.date;
  }

  const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${ref}/${FILE}`;
  console.log(`Downloading ${rawUrl}`);
  const res = await fetch(rawUrl);
  if (!res.ok) throw new Error(`GET ${rawUrl} -> ${res.status}`);
  const text = await res.text();
  const sha256 = createHash('sha256').update(text).digest('hex');

  const doc = yaml.load(text);
  const pathCount = Object.keys(doc.paths || {}).length;
  let opCount = 0;
  const HTTP = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
  for (const item of Object.values(doc.paths || {})) {
    for (const v of HTTP) if (item[v]) opCount++;
  }

  console.log('Validating with @apidevtools/swagger-parser ...');
  // validate() mutates its input while dereferencing; validate a deep copy so the pinned bytes stay canonical
  await SwaggerParser.validate(structuredClone(doc));

  const pin = {
    source: `https://github.com/${OWNER}/${REPO}`,
    artifact: FILE,
    branch: BRANCH,
    ref,
    ref_date: refDate,
    raw_url: rawUrl,
    fetched_at: new Date().toISOString(),
    sha256,
    openapi_version: doc.openapi,
    info_version: doc.info?.version ?? null,
    info_title: doc.info?.title ?? null,
    paths: pathCount,
    operations: opCount,
  };

  mkdirSync(dirname(specPath), { recursive: true });
  mkdirSync(dirname(pinPath), { recursive: true });
  writeFileSync(specPath, text);
  writeFileSync(pinPath, JSON.stringify(pin, null, 2) + '\n');
  console.log(`OK: openapi ${doc.openapi}, info.version ${pin.info_version}, ${pathCount} paths / ${opCount} operations`);
  console.log(`Pinned ${ref} (${refDate}) sha256 ${sha256}`);
  console.log(`Wrote ${specPath} and ${pinPath}`);
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}; nothing written`);
  process.exit(1);
});
