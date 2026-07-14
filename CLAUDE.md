## Project

This repository builds and documents the **next-generation `openai` provider** for StackQL, replacing the v1 `openai` provider **in this same repository, in situ** - SQL-based query and provisioning operations against the OpenAI platform surface available to standard API keys: models, files (metadata), fine-tuning (jobs, events, checkpoints), batches, vector stores (and their files and file batches), assistants/threads/runs (deprecation-labelled, see below), evals, uploads metadata, and container/session metadata where cleanly exposed.

**This is a replacement, not an increment** - the snowflake refresh is the direct precedent: the new provider is generated on the current toolchain from the vendor's published spec, compared resource-by-resource against the v1 provider already in this repo, and ships with a Breaking Changes section documenting every rename and removal. v1 generation artifacts are archived in-repo (`legacy/`), never silently deleted, and the v1 toolchain is retired.

**Scope boundaries, recorded so they are never relitigated**:
- The **organization/admin surface** (`/v1/organization/...` - usage, costs, projects, users, invites, audit logs, admin keys) uses a separate admin key class and is the sibling provider `openai_admin`, built in its own repository from the same pinned spec source. Nothing under `/organization` maps here.
- **Inference invocation** (chat/completions, responses, embeddings, images, audio, moderations, realtime) is the data plane, out of scope per the standing model-provider posture (the anthropic/openrouter treatment). **Batches are in scope** - an async job control surface, not an invocation.
- Binary transfer (file content, upload parts) is skipped per the standing exclusions; file and upload *metadata* is in scope.

Build pipeline and repository pattern follow stackql-registry/stackql-provider-k8s (branch `feature/provider-dev`). Sibling NOTES.md findings are reused, not re-derived - the snowflake refresh (replacement discipline), the anthropic provider (model-vendor scope posture), nvidia/oci (deprecation-as-build-input), keycloak (REPLACE-vs-UPDATE warning).

## Spec source

OpenAI publishes its OpenAPI specification (the artifact its SDKs are generated from) via the `openai/openai-openapi` repository. Phase 1 records the canonical current artifact (repo ref or served location); `bin/fetch-spec.sh` downloads, validates with `@apidevtools/swagger-parser`, and pins (source, ref, date, hash) in `provider-dev/config/spec_pin.json`. The spec covers the full platform including the organization subtree - `clean_specs.mjs` filters `/organization` paths out of this build deterministically (they belong to `openai_admin`), alongside the data-plane and binary exclusions, all reason-coded. Refreshes are reviewed diffs, never silent regenerations.

**Deprecation is a build input** (the nvidia/oci discipline): the Assistants family carries the vendor's migration-to-Responses deprecation. Assistants/threads/runs map with the vendor's deprecation labelling carried into the docs; the drift CI watches the timeline; resources retire when the vendor retires them, with the policy recorded.

## Design principles

- **Fixed server, bearer auth, optional org/project headers** - `https://api.openai.com/v1`; `Authorization: Bearer` with `OPENAI_API_KEY`. Optional `OpenAI-Organization` / `OpenAI-Project` headers exposed via one mechanism decided in phase 1.
- **The OpenAI list envelope and derived cursor** - lists wrap as `{"object": "list", "data": [...], "first_id": ..., "last_id": ..., "has_more": bool}` with `limit`/`after`/`order`. `objectKey` `$.data`; the continuation token is *derived* - `after` takes the previous page's `last_id` (no dedicated next-token field). Whether any-sdk pagination config expresses `requestToken: after` fed from `responseToken: $.last_id` (terminate on absent / `has_more` false) is the phase 1 pagination finding; per-resource honesty for deviations.
- **Async jobs are the core surface** - fine-tuning jobs and batches: `INSERT` creates, `SELECT` polls, `EXEC` cancels; events/checkpoints are child `SELECT` resources.
- **Deep configs lower honestly** - hyperparameter/method blocks, chunking strategies, tool configs: columns plus `json_extract`.
- **OpenAI updates are POSTs with partial bodies** - confirm per resource, label `UPDATE` (keycloak warning applies to full-representation exceptions).

## Replacement mechanics (in-situ refresh discipline)

The v1 provider lives in this repository. The refresh proceeds alongside it, then replaces it:

- `inventory_predecessor.mjs` reads the **v1 provider artifacts in this repo** (the existing generated service docs, wherever the repo currently keeps them) and writes `provider-dev/config/predecessor_inventory.csv`: every v1 service, resource, method, verb.
- Every predecessor entry is dispositioned: **carried** (same name), **renamed** (old -> new recorded), **retired** (data-plane, org-subtree, or defunct - reason-coded).
- README.md carries a **Breaking Changes** section *generated* from the disposition table (the snowflake refresh format) - never hand-written.
- Cutover: v1 generation artifacts and v1-era scripts move to `legacy/` in one commit (history preserved); the new `provider-dev/` becomes the only pipeline; the registry publish replaces the provider version per the registry flow; the docs site notes the generation change once.
- Acceptance: the v1 provider's documented example queries re-run against the new provider - each passes unchanged or is covered by a Breaking Changes entry. No third state.

## Toolchain rules

Latest `@stackql/provider-utils` (check npm first); Node >= 20, `type: module`; CLI entry points wrapped as npm scripts invoked through `node`; a local `stackql` binary for testing.

## Repository layout (target state after cutover)

```
legacy/                       # archived v1 artifacts and scripts (one commit)
provider-dev/
  downloaded/                 # pinned spec snapshot
  source/                     # cleaned + filtered + split per-service specs
  config/                     # spec pin, predecessor inventory + dispositions, service names, all_services.csv
  openapi/src/openai/         # generated provider output (replaces v1 output)
  scripts/                    # clean_specs.mjs (incl org filter), inventory_predecessor.mjs, map_operations.mjs, pre_normalize.mjs, post_process.mjs
bin/                          # npm wrappers (mirror k8s repo)
tests/                        # integration mock + fixtures + smoke_test.py
website/                      # existing Docusaurus site retained, regenerated
CLAUDE.md
README.md                     # k8s-README style, incl Breaking Changes and the openai_admin sibling note
```

## Build pipeline

Deterministic and re-runnable throughout; validate-and-fail-without-writing; manual decisions as rules in scripts, never hand-edits.

**0. Fetch, pin, filter, clean; inventory the predecessor** - per the spec-source and replacement sections.

**1. Split** - `npm run split --provider-name openai`. Services (decided by the phase 1 inventory, recorded in `service_names.json`; tag-discriminated - the untagged Containers family is tag-stamped deterministically in `clean_specs.mjs`): `models`, `files`, `fine_tuning` (jobs, events, checkpoints, checkpoint_permissions), `batches`, `vector_stores` (vector_stores, files, file_batches, file_batch_files), `assistants` (deprecation-labelled family: assistants, threads, messages, runs, run_steps), `evals` (evals, runs, run_output_items), `uploads` (metadata), `containers` (containers, files), `conversations` (conversations, items - the Responses-family state surface, added by the phase 1 decision), `skills` (skills, versions - added by the phase 1 decision; content endpoints excluded as binary).

**2. Mappings** - GET list -> `SELECT .list` (`$.data`, derived cursor); GET single -> `SELECT .get`; POST create -> `INSERT`; POST partial update -> `UPDATE` (confirmed per resource); DELETE -> `DELETE`; cancel -> `EXEC`; inference/org-subtree/binary -> skipped, reason-coded. Plural snake_case names. Validation includes disposition-table consistency (no v1 resource undispositioned), unique signatures, complete disposition coverage.

**3. Normalize** - `$.data` unwrapping; deep blocks to `json_extract`.

**4. Generate** - servers `https://api.openai.com/v1`; auth bearer `OPENAI_API_KEY`; cursor config per the finding; org/project header mechanism per the decision; post-process for the rest.

**5. Test** - the four k8s layers: offline SHOW/DESCRIBE; meta-routes; integration mock asserting `$.data`, the derived-cursor traversal (`after` = prior `last_id`, terminate `has_more: false`), a vector store lifecycle with file membership, a fine-tuning cancel `EXEC`, deprecation labels present, auth headers throughout; smokes cost-tiered - **ungated**: reads and cost-free lifecycles (file metadata round trip, vector store create/delete); **gated**: anything consuming tokens or training compute (mock-first, live only by explicit decision); `stackql-smoke-<stamp>` naming, breadcrumbs swept. Never against a production project.

**6. Cutover and publish** - the `legacy/` archive commit; registry version replacement; `registry pull openai` verification; the v1 example-query acceptance run.

**7. Docs** - existing microsite regenerated (`openai-provider.stackql.io`). Lead: fine-tuning history and checkpoint inventory, batch status and error triage, vector store audits, file estate by purpose/age, assistants inventory with the deprecation posture - plus the `openai_admin` sibling pointer and the generation-change note once.

**8. CI** - fetch + pin + filter + build, mock integration, meta-routes, gated smokes; spec-drift job plus an assistants deprecation-timeline watch.

## Writing conventions

Measured, precise, no hyperbole; third-person or passive descriptive framing; no em dashes (use `-`); `->` for arrows; QWERTY-only characters; k8s-README-style runnable examples with `json_extract`.

## Non-negotiables

1. Latest `@stackql/provider-utils`, always
2. The k8s repo is the reference pattern; sibling findings reused, not re-derived
3. Nothing under `/organization` maps here - the subtree filter is validated
4. Every v1 resource is dispositioned - Breaking Changes is generated, never hand-written
5. v1 artifacts archive to `legacy/` in one commit - nothing silently deleted
6. Token/compute-consuming operations never run outside the gated tier
7. Deterministic scripts, never hand-edits to derived artifacts
8. Every regeneration is followed by the integration suite before commit