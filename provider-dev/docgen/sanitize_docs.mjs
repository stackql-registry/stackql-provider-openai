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

// ---------------------------------------------------------------------------
// SQL example fixups
//
// The doc generator emits every parameter into the example WHERE clause / INSERT
// column list verbatim, which produces SQL that does not parse:
//   - `order` is a stackql reserved word ("syntax error ... near 'order'")
//   - `openai-organization` / `openai-project` are hyphenated identifiers
//     ("unexpected: openai - organization"); they carry the vendor's headers,
//     whose wire names must be hyphenated
// Both parse once double-quoted, so quote them.
//
// `limit` is dropped from the examples entirely: it is the page-size parameter
// driven by the `top` query-param pushdown, so a SQL `LIMIT n` clause supplies it
// automatically - showing `WHERE limit = ...` teaches the wrong idiom. The params
// table still documents it (annotated in pre_normalize.mjs).
// ---------------------------------------------------------------------------

// identifiers that must be double-quoted to parse in a WHERE clause / column list
const NEEDS_QUOTING = ['order', 'openai-organization', 'openai-project'];
const quoteAlt = NEEDS_QUOTING.map((s) => s.replace(/[-]/g, '\\-')).join('|');
const WHERE_QUOTE = new RegExp(`^((?:WHERE|AND) )(${quoteAlt})( = )`, 'gm');
const COLUMN_QUOTE = new RegExp(`^(${quoteAlt})(,?)$`, 'gm');
const LIMIT_LINE = /^(?:WHERE|AND) limit = '\{\{ limit \}\}'[ \t]*\r?\n/gm;

// Within a SQL block, a removed leading `WHERE` must be replaced by promoting the
// next `AND` condition, else the clause is orphaned.
function promoteOrphanedAnd(sqlBlock) {
  const lines = sqlBlock.split('\n');
  if (lines.some((l) => /^WHERE /.test(l))) return sqlBlock;
  const idx = lines.findIndex((l) => /^AND /.test(l));
  if (idx === -1) return sqlBlock;
  lines[idx] = lines[idx].replace(/^AND /, 'WHERE ');
  return lines.join('\n');
}

function fixSqlBlocks(text, counters) {
  return text.replace(/```sql\n([\s\S]*?)```/g, (whole, body) => {
    let out = body;
    const beforeLimit = out;
    out = out.replace(LIMIT_LINE, () => { counters.limitDropped++; return ''; });
    if (out !== beforeLimit) out = promoteOrphanedAnd(out);
    out = out.replace(WHERE_QUOTE, (_m, pre, ident, post) => { counters.quoted++; return `${pre}"${ident}"${post}`; });
    out = out.replace(COLUMN_QUOTE, (_m, ident, comma) => { counters.quoted++; return `"${ident}"${comma}`; });
    return '```sql\n' + out + '```';
  });
}

const files = walk(docsDir);
let filesTouched = 0;
let rewrites = 0;
const counters = { limitDropped: 0, quoted: 0 };

for (const file of files) {
  const before = readFileSync(file, 'utf8');
  let after = before.replace(MD_LINK, () => { rewrites++; return `](${HOST}/docs/`; });
  after = after.replace(HTML_HREF, (_m, pre) => { rewrites++; return `${pre}${HOST}/docs/`; });
  after = fixSqlBlocks(after, counters);
  if (after !== before) {
    writeFileSync(file, after);
    filesTouched++;
  }
}

console.log(`Sanitized ${rewrites} OpenAI doc link(s) -> prefixed with ${HOST}`);
console.log(`SQL examples: dropped ${counters.limitDropped} \`limit\` predicate(s) (supplied by a SQL LIMIT clause via the top pushdown); quoted ${counters.quoted} identifier(s) that do not parse bare (${NEEDS_QUOTING.join(', ')}).`);
console.log(`Touched ${filesTouched} of ${files.length} file(s) scanned.`);
