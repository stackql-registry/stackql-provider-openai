#!/usr/bin/env node
// Post-generate docs sanitizer. The OpenAI spec's field/method descriptions
// contain relative links to OpenAI's own docs (`[Files API](/docs/api-reference/
// files/retrieve-contents)`, `/docs/guides/...`, `/docs/models`). generate-docs
// carries those through verbatim, so they resolve against the stackql microsite
// and 404.
//
// Fix: prefix every `/docs/...` link with `https://platform.openai.com`. OpenAI's
// path structure has moved (to developers.openai.com, with renamed leaves -
// retrieve-contents -> retrieve, fine-tuning -> model-optimization), so the new
// deep paths cannot be computed deterministically. But platform.openai.com serves
// a 301 redirect from every old `/docs/...` path to its current home (verified
// 25/26 distinct targets at build time; the 26th is a live page behind an anti-bot
// 403, not a 404), so the host prefix lands users on the right page and stays
// correct as OpenAI reorganises - the redirect map is theirs to maintain, not ours.
//
// Only `/docs/...` links are touched; internal `/services/...` navigation is left
// alone. Idempotent (rewritten https:// links no longer match) and re-runnable.
// Usage: node provider-dev/docgen/sanitize_docs.mjs [--docs-dir website/docs]

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);
const docsDirArg = args.indexOf('--docs-dir');
const docsDir = docsDirArg !== -1 ? args[docsDirArg + 1] : join(repoRoot, 'website', 'docs');

const HOST = 'https://platform.openai.com';
// markdown `](/docs/...)` and html `href="/docs/..."`; only the /docs/ subtree
const MD_LINK = /\]\((\/docs\/)/g;
const HTML_HREF = /(href=")(\/docs\/)/g;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (entry.endsWith('.md') || entry.endsWith('.mdx')) out.push(p);
  }
  return out;
}

const files = walk(docsDir);
let filesTouched = 0;
let rewrites = 0;

for (const file of files) {
  const before = readFileSync(file, 'utf8');
  let after = before.replace(MD_LINK, () => { rewrites++; return `](${HOST}/docs/`; });
  after = after.replace(HTML_HREF, (_m, pre) => { rewrites++; return `${pre}${HOST}/docs/`; });
  if (after !== before) {
    writeFileSync(file, after);
    filesTouched++;
  }
}

console.log(`Sanitized ${rewrites} OpenAI doc link(s) across ${filesTouched} file(s) (of ${files.length} scanned) -> prefixed with ${HOST}`);
