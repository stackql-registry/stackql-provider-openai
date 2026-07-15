# Engineering Notes

Phase 1 working notes for the next-generation `openai` provider (in-situ replacement of v1). Each item records what was investigated, the evidence, and what remains open. Established cross-provider findings are reused, not re-derived: the replacement discipline (predecessor inventory, dispositions, generated Breaking Changes), the model-vendor scope posture, deprecation-as-build-input, blocked-on-key gating, and the REPLACE-vs-UPDATE warning.

## 1. Repo survey and the v1 footprint (task 1)

Surveyed 2026-07-15 at commit `15f31f1` (branch `feature/provider-dev`).

**What v1 comprises in this repo.** The v1 provider's only in-repo artifacts are the generated Docusaurus service docs, moved here from the monolithic docs site in commit `15f31f1` ("moved to microsite", 2025-09-18):

- `website/docs/index.md` - provider intro (claims 17 services / 52 resources; the resource count in that banner does not match the tree - see below)
- `website/docs/services/<service>/index.md` - 17 service index pages
- `website/docs/services/<service>/<resource>/index.md` - 35 resource pages, each with an Overview table (resource id), a Fields table, a Methods table (method name, SQL verb, required params), and SELECT/INSERT/DELETE example blocks where applicable
- `website/build/` - a committed static build of the same site (derived artifact, regenerated at docs time)

v1 services and per-service resource counts: assistants (5: assistants, messages, run_steps, runs, threads), audio (3: speeches, transcriptions, translations), audit_logs (1), batch (1: batches), chat (1: completions), completions (1), embeddings (1), files (1), fine_tuning (3: jobs, events, job_checkpoints), images (3: images, image_edits, image_variations), invites (2: invites, users), models (1), moderations (1), projects (4: projects, project_api_keys, project_service_accounts, project_users), uploads (2: uploads, upload_parts), users (1), vector_stores (4: vector_stores, vector_store_files, vector_store_file_batches, files_in_vector_store_batches).

**No v1 generation pipeline survives in this repo.** `provider-dev/{config,downloaded,openapi,source,scripts}` exist but contain only `.gitkeep` placeholders; `bin/` holds template scaffolding copied from the digitalocean template (`package.json` still carries `"name": "stackql-provider-digitalocean"` and `@stackql/provider-utils ^0.5.0` - the latest on npm is 0.7.6, to be adopted per non-negotiable 1). There are no v1 openapi source artifacts, no v1 spec snapshot, and no v1 generation scripts to archive - the generated provider yaml for v1 lives in the central `stackql/stackql-provider-registry`, not here.

**`legacy/` archive plan (the exact move list for the cutover commit):**

- `website/docs/services/` (17 service trees, 52 md files) -> `legacy/website-docs-services/`
- `website/docs/index.md` -> `legacy/website-docs-services/index.md`
- `website/build/` - regenerated at docs time, not archived (derived artifact); removed in the same commit and rebuilt from the new docs
- nothing else qualifies: bin/ scaffolding is template-generic (upgraded in place, not v1-specific), provider-dev/ is empty

The registry-side replacement (provider yaml version bump) happens in `stackql/stackql-provider-registry` per the registry flow, outside this repo.

**Website state.** Docusaurus site deployed to `openai-provider.stackql.io` via GitHub Pages, driven by `.github/workflows/{prod,test}-web-deploy.yml` (`static/CNAME` pins the domain). `star-check.yml` is deleted in the working tree (pre-existing local change, carried into the first commit).

**v1 documented example queries (the task 9 acceptance-query source).** Every resource page carries a `SELECT` example (`SELECT <fields> FROM openai.<service>.<resource>`), and INSERT/DELETE examples where mapped. The acceptance list is extracted from these pages at task 9.

**Live-credential status.** `OPENAI_API_KEY` is not present on this machine (process, user, machine scopes; no `.env` here or in sibling repos beyond anthropic's own key). The nvidia/vsphere blocked-on-key pattern applies: all offline phases proceed; the task 4 live two-page traversal and the task 8 vector-store cost-free lifecycle are recorded as owed runbooks that execute unchanged once a key is present.

## 2. Spec source, pin and filter (task 3)

**Canonical artifact.** `openai/openai-openapi` publishes a single `openapi.yaml` (2.8 MB) on the default branch `main` - actively maintained (pushed 2026-07-14, the day before this pin). The dated branches (`2025-02-04` ...), `manual_spec` (last commit 2025-04-29) and `master` are historical. Pinned in `provider-dev/config/spec_pin.json`:

- ref `a3276900e58b8b2a92e0cb087cd2e6e005f58458` (2026-07-14), sha256 `74cbcf73...d4f5f8b`
- openapi `3.1.0`, info.version `2.3.0`, 162 paths / 242 operations
- `@apidevtools/swagger-parser` 12.1.0 validates clean, no repairs
- `bin/fetch-spec.sh --check` re-resolves `main` HEAD against the pin (the drift-CI hook); refreshes are reviewed diffs via `--ref`

`openapi: 3.1.0` carries the nvidia finding: 3.1 passed split/analyze there; normalize/generate are the unexercised legs - any breakage lands in `pre_normalize.mjs` as a deterministic downgrade of affected constructs.

**Filter result** (`clean_specs.mjs`, first-match-wins path rules, report in `provider-dev/config/filter_report.csv`): 162 paths / 242 ops -> 59 paths / 100 ops.

- `org-admin-surface` 52 paths / 81 ops - the `/organization` subtree plus the `/projects/{project_id}` role/group surface (same admin key class, not under `/organization`; recorded because non-negotiable 3 says "nothing under /organization" and these six paths are the one admin-class family outside it) -> `openai_admin`
- `data-plane-inference` 38 paths / 47 ops - chat/completions (including the stored-completions GET/POST/DELETE metadata sub-surface: the family is excluded whole per the recorded posture), completions, responses, embeddings, images, audio (including `voice_consents` - see Open), moderations, realtime, videos (Sora generation jobs - see Open)
- `binary-transfer` 6 paths / 6 ops - file/container-file/vector-store-file/skill content, upload parts
- `beta-ui-surface` 5 paths / 6 ops - ChatKit sessions (client-secret issuance) and threads (see Open)
- `alpha-unstable` 2 paths / 2 ops - `/fine_tuning/alpha/graders/{run,validate}` (compute-consuming, alpha-labelled)

The validator fails the run if any rule matches nothing (stale-rule guard) or if any `/organization` path survives (non-negotiable 3). Kept in scope beyond the CLAUDE.md candidate list: `/conversations` (CRUD + items - the metadata/state surface of the Responses family, the successor shape to assistants threads which are themselves in scope) and `/skills` (files-like versioned metadata CRUD, standard key, non-inference; content endpoints excluded as binary). Both flagged under Open for explicit confirmation.

**Deprecation labels in the pinned spec.** Only the five `/assistants` CRUD operations carry `deprecated: true`. Threads, messages, runs and run steps carry no operation-level flag despite the vendor's family-wide migration-to-Responses deprecation. The family-wide labelling is therefore a deterministic rule at build time (assistants + threads path families -> deprecated), recorded as such and re-checked by the drift CI - when the vendor stamps the rest of the family (or removes the paths), the rule is revisited with the diff.

## 3. Pagination: the derived cursor (task 4)

**The envelope, from the pinned spec.** 22 GET-list operations return a `data[]` envelope in the filtered surface:

- 19 carry the full `{object, data, first_id, last_id, has_more}` list envelope (assistants, batches, containers, container files, conversation items, evals, eval runs, eval run output items, files, checkpoint permissions, job checkpoints, thread messages, thread runs, run steps, vector stores, vector store files, vector store batch files, skills, skill versions)
- 2 deviate: `GET /fine_tuning/jobs` and `.../events` return `{object, data, has_more}` - no `first_id`/`last_id`
- 1 is unpaginated: `GET /models` returns `{object, data}` with no cursor params

**any-sdk/stackql engine analysis** (any-sdk local checkout `eff549b`, stackql `2a0297b`, binary v0.10.542):

- The derived cursor IS expressible in config. `requestToken: {key: after, location: query}` is applied verbatim: `SetNextPage()` clones the prior request and `q.Set("after", token)` (any-sdk `internal/anysdk/http_armoury_params.go:114-122`). `responseToken: {key: $.last_id, location: body}` extracts by JSONPath: `extractNextPageTokenFromBody` -> `res.ExtractElement` -> `jsonpath.Get("$.last_id", body)` (stackql `internal/stackql/execution/mono_valent_execution.go:1883-1915`, any-sdk `pkg/response/response.go:105-124`, PaesslerAG/jsonpath v0.1.1). No dedicated next-token field is needed - the previous page's `last_id` IS the token, which is exactly this mechanism.
- **`has_more` cannot terminate the loop.** any-sdk's config vocabulary has `responseTerminator` (`internal/anysdk/pagination.go:44`), but nothing in the stackql traversal loop consumes it (zero references under stackql `internal/`). Termination is solely `tk == "" || tk == "<nil>" || tk == "[]"` (`mono_valent_execution.go:495`).
- **Termination still works, at the cost of one extra request.** On the true last page `has_more` is `false` but `last_id` is still populated, so the loop issues one further call with `after=<final last_id>`. That page returns `data: []` with `last_id: null` (or absent): JSONPath yields nil -> `fmt.Sprintf("%v", nil)` = `"<nil>"` -> termination value (null case), or extraction error -> map-lookup fallback misses -> `""` (absent case). Either way traversal ends after exactly one empty overshoot request per full listing. Documented as the accepted cost; an engine ticket for `responseTerminator` consumption (evaluate `$.has_more == false`) is a follow-up, not a v1 gate.
- Config placement is service-level `x-stackQL-config` (provider-level pagination inheritance is broken in any-sdk).

**The config** (applied per service at generate/post-process time):

```yaml
x-stackQL-config:
  pagination:
    requestToken:
      key: after
      location: query
    responseToken:
      key: $.last_id
      location: body
```

**Per-resource honesty for the deviants.** In `fine_tuning`, the jobs and events lists lack `last_id`: under the service-level config the token extraction misses -> `""` -> the loop cleanly stops after page 1. Those two resources are documented as first-page-plus-parameters (`after`, `limit` as WHERE parameters). A candidate config keyed at `$.data[-1:].id` exists in principle but negative-index JSONPath support in PaesslerAG/jsonpath v0.1.1 is unverified (no Go toolchain on this machine) - parked under Open; the honest posture ships either way. `models.list` is a single unpaginated call - no config effect.

**Live two-page traversal - BLOCKED on `OPENAI_API_KEY`** (see section 1). Runbook, executes unchanged once a key is present:

1. Seed >= 3 metadata rows if needed (three `stackql-smoke-<stamp>` vector stores - cost-free, deleted in-run; files work too if >= 3 exist).
2. `GET /v1/vector_stores?limit=2` - assert the envelope (`object: list`, `data`, `first_id`, `last_id`, `has_more: true`) and capture `last_id`.
3. `GET /v1/vector_stores?limit=2&after=<last_id>` - assert the second page starts after the first page's last id and `has_more: false`.
4. `GET /v1/vector_stores?limit=2&after=<final last_id>` - assert the empty-page shape (`data: []`, `last_id` null/absent) that the engine relies on for termination.
5. Same three steps through the generated provider (`SELECT ... FROM openai.vector_stores.vector_stores`) with a debug proxy or `--http.log`, asserting the loop makes exactly pages+1 requests and returns the union.

## 4. Predecessor inventory and dispositions (tasks 2, 6)

`inventory_predecessor.mjs` parses the v1 resource pages' Methods tables: **94 methods, 35 resources, 17 services** (SELECT 39, INSERT 24, DELETE 12, EXEC 11, UPDATE 8). The join key to the new surface is the operationId - v1 method names are snake_case operationIds from the older spec sync, typo included (`submit_tool_ouputs_to_run` = `submitToolOuputsToRun`, still present upstream). The 25 v1 methods with no operationId match are all in the four admin services (their operationIds were renamed upstream); a service-level rule dispositions them.

`disposition_predecessor.mjs` result - **no v1 entry undispositioned (the validator forbids a third state)**:

- **carried 42** - same `openai.<service>.<resource>` FQN (method names become resource-scoped: `retrieve_batch` -> `get`)
- **renamed 13** (5 distinct resource renames): `batch.batches` -> `batches.batches`, `fine_tuning.job_checkpoints` -> `fine_tuning.checkpoints`, `vector_stores.vector_store_files` -> `vector_stores.files`, `vector_stores.vector_store_file_batches` -> `vector_stores.file_batches`, `vector_stores.files_in_vector_store_batches` -> `vector_stores.file_batch_files`
- **retired 39**: 26 org-admin-surface (-> `openai_admin`: audit_logs, invites x2, projects x4, users), 10 data-plane-inference (audio x3, chat, completions, embeddings, images x3, moderations), 2 method-level (files.create_file multipart, files.download_file binary - the `files.files` resource itself survives as list/get/delete), 1 binary (uploads.upload_parts)

No v1 resource lacks an obvious successor - every retirement carries a standing-posture reason code, so nothing needs an explicit decision beyond the Open items below. The Breaking Changes README section is generated from this table (marker-delimited, `disposition_predecessor.mjs` refuses to run without exactly one marker pair).

## 5. Endpoint inventory and the service split (tasks 5, 7)

`build_inventory.mjs` over the filtered spec -> `endpoint_inventory.csv`: **100 operations, 99 mapped / 1 skipped (createFile: multipart-binary-body), 26 resources, 11 services** (select 43, insert 19, delete 16, exec 12, update 9). 23 deprecation-labelled ops (5 spec-flagged assistants CRUD + 18 family-rule), 9 update-POSTs, 20 async-job ops (create/poll/cancel triples on fine_tuning.jobs, batches, vector_stores.file_batches, uploads, assistants.runs, evals.runs; plus pause/resume/complete controls).

**Service split (recorded in `service_names.json`, CLAUDE.md candidates updated):** `assistants` (assistants, threads, messages, runs, run_steps), `batches`, `containers` (containers, files), `conversations` (conversations, items), `evals` (evals, runs, run_output_items), `files`, `fine_tuning` (jobs, events, checkpoints, checkpoint_permissions), `models`, `skills` (skills, versions), `uploads`, `vector_stores` (vector_stores, files, file_batches, file_batch_files). Additions vs the CLAUDE.md candidates: `conversations` and `skills` (rationale in section 2). The split is tag-discriminated - the spec's tags map 1:1 to these services (the `Assistants` tag already spans `/assistants` + `/threads`), with two mechanics: the untagged Containers ops are tag-stamped in `clean_specs.mjs`, and `service_names.json` keys are provider-utils-normalized tag names (`batch` -> `batches` is the one real override; overrides apply after `normalizeServiceName`, verified in provider-utils 0.7.6 `split.js:127`).

## 6. Pilot mapping - GREEN (task 8)

Split (11 services) -> `generate-mappings` (analyze; the keycloak "delete `all_services.csv` before re-run" carry-over applies) -> `map_operations.mjs`. The mapper's rule table IS `endpoint_inventory.csv` joined by operationId - one source of truth, no second rule set to drift. All validations pass: coverage both directions, unique (service, resource, method), unique path-param signatures per (resource, SQL verb) (exec excluded), list methods all carry `$.data`, and disposition consistency (every carried/renamed v1 method resolves to a mapped method - 55/55).

- `fine_tuning` (async-job archetype): jobs `create`/`get`(poll)/`list` + `cancel`/`pause`/`resume` EXEC; children events/checkpoints SELECT-only; checkpoint_permissions list/create/delete
- `vector_stores` (CRUD flagship): full CRUD + `search` EXEC on the store; files CRUD (update = attributes POST); file_batches create/poll/cancel; file_batch_files list
- `batches` (async boundary case): create/get/list + cancel EXEC

No signature collisions anywhere (the oci `GetCompartment` failure mode does not occur: OpenAI child paths always add a distinct path parameter). The live vector-store lifecycle proof is blocked on key - runbook in section 7.

## 7. Decisions and evidence for the remaining open questions (task 9)

**Org/project headers - DECIDED: optional header parameters injected at pre-normalize, the anthropic mechanism.** The pinned spec declares neither `OpenAI-Organization` nor `OpenAI-Project` on any operation (zero occurrences). The in-family precedent is the anthropic provider, which declares `anthropic-version` as an optional per-operation header parameter with a schema default, generated through this same toolchain. Phase 2 `pre_normalize.mjs` injects both headers as `required: false` header parameters on every operation (deterministic rule); they surface as optional query parameters (settable in WHERE / INSERT params), never in required params; documented once in the README auth section. No auth-config or engine mechanism for static extra headers exists to prefer over this.

**Update-POST partial semantics (keycloak warning) - spec-side evidence recorded, wire probes owed.** All 9 update-POSTs are labelled `UPDATE`, none `REPLACE`. Pilot evidence: `UpdateVectorStoreRequest` has zero required properties, all nullable (name, expires_after, metadata) - partial by construction; `updateVectorStoreFileAttributes` requires exactly the one field it targets (`attributes`) - a targeted update, not a representation replace. The OpenAI convention ("Only fields provided are updated" per the modify-* documentation) matches. Wire-level omitted-field-preservation probes (the keycloak method: update one field, assert others unchanged) fold into the blocked-on-key runbook for `vector_stores.update` and `files.update` before generation ships.

**Deprecation labels through the generator - rule recorded, generate-phase verification owed.** The five spec-flagged `/assistants` ops carry `deprecated: true` through split unchanged (verified in `provider-dev/source/assistants.yaml`). The family rule (all assistants-service resources labelled deprecated in docs) is applied at the docs/post-process stage in phase 2; the endpoint inventory carries the flag per op (`spec` vs `family-rule` provenance). Drift CI watches for the vendor stamping threads/runs or removing paths.

**Derived-cursor config in the pilots** - the section 3 config is the generate-phase input for all 11 services (service-level `x-stackQL-config`); `fine_tuning` ships with the two documented first-page deviants (jobs, events). Nothing further to decide in phase 1.

**Rate limits and pacing - nothing observed (no live calls this session; blocked on key).** Posture recorded for the smoke design: metadata endpoints sit in the standard per-tier RPM buckets; the suites pace at <= 1 request/second, honor `Retry-After` on 429, and never parallelize writes. To be replaced with observed numbers when the key lands.

**Gated-tier design for token/compute smokes - mock-first, recorded now:**

- **Ungated (every CI run once a key exists):** offline SHOW/DESCRIBE + meta-routes (no key); live reads (models, files, vector_stores lists); cost-free lifecycles - vector store create -> get -> update metadata -> delete (no files attached, no embeddings billed), upload create -> cancel (metadata only). `stackql-smoke-<stamp>` naming; sweep prior breadcrumbs by name prefix before each run.
- **Gated (mock-first; live only by explicit decision, never in CI defaults):** fine-tuning job create (training compute), batch create (token consumption on execution), `vector_stores.search` (embeds the query), eval run create, assistants runs (inference). The integration mock asserts the wire shapes for all of these (create/poll/cancel triples, `$.data` unwrapping, derived-cursor traversal incl. the empty-overshoot page, deprecation labels, bearer + org/project headers) so the gated tier's live value is purely confirmatory.
- Never against a production project; a dedicated test project under the org.

**Cutover plan (drafted; executes at phase 2 exit):**

1. The `legacy/` archive commit (one commit, history preserved): move `website/docs/services/` -> `legacy/website-docs-services/` and `website/docs/index.md` alongside; delete `website/build/` (derived; regenerated from the new docs). Nothing else is v1-specific (section 1).
2. Registry publish: new provider version for `openai` in `stackql/stackql-provider-registry` replacing the v1 version per the registry flow; old version stays pullable for pinning.
3. Verification: `REGISTRY PULL openai` against the published registry; the four test layers re-run `--registry public`.
4. Acceptance: the v1 documented example queries re-run - each passes unchanged or is covered by a Breaking Changes entry, no third state. Extracted target list (22 SELECT + 12 DELETE FROM-targets across the 35 v1 resource pages, plus the INSERT examples): every target resolves through `predecessor_dispositions.csv` - carried targets must pass verbatim; the 5 renamed vector_stores/batch/fine_tuning targets and the retired org-admin/data-plane targets are covered by the generated Breaking Changes section. The extraction command and the per-target expectation are re-derived from the dispositions CSV at acceptance time (deterministic, no hand-kept list).
5. Docs site regenerated (`openai-provider.stackql.io`) with the generation-change note and the `openai_admin` sibling pointer.

## 8. Query-parameter pushdown - investigated, no clean v1 opportunity

any-sdk's `queryParamPushdown` config (translating SQL clauses to query params) is a **live, wired** engine feature, unlike `responseTerminator`: stackql's `internal/stackql/pushdown` extracts a neutral intent (projection/predicates/order-by/limit/offset/count) from the SELECT, gated on the method carrying the config, and any-sdk's `ApplyPushdown` renders it. Six pushdown types exist: `select` (`$select`), `filter` (`$filter`), `orderBy`, `top` (LIMIT), `skip` (OFFSET), `count`. Purely an optimisation - client-side WHERE/projection/LIMIT stay authoritative, so a partial or absent translation never changes results.

Assessed against the OpenAI list surface, **none is a clean fit for v1**:

- **`filter` and `orderBy` render OData syntax only** (`applyPushdownFilter`/`applyPushdownOrderBy` require `syntax: odata` and emit `col eq 'v'` / `col desc`). OpenAI has no filter DSL - it uses discrete named query params - and its `order` is direction-only (`asc`/`desc`, implicitly on `created_at`), not a `col dir` expression. No renderer fits.
- **`select`/`skip`/`count` have no OpenAI equivalent** - no sparse fieldsets on lists, cursor pagination not offset, no count endpoints in scope.
- **`top` (LIMIT -> `limit`) is the only structural candidate, and it collides with pagination.** OpenAI's `limit` IS the pagination page-size parameter. The REST acquire path's pagination loop (`mono_valent_execution.go:1277-1304`) is eager - it fetches every page until the cursor token is absent and never consults the SQL LIMIT (only the GraphQL path bounds pages by `GetPushdownLimit`). So a `top` pushdown on `limit` would set the page size without reducing rows fetched, and for a small `LIMIT` it shrinks pages and *increases* request count. Counterproductive while cursor pagination is on.

**What users want (filter/limit/project) is already delivered by ordinary parameter binding**, not pushdown: the discrete query params are carried onto the list methods as WHERE-able parameters (verified on `files.list`: `purpose`, `limit`, `order`, `after`). `SELECT ... FROM openai.files.files WHERE purpose = 'fine-tune' AND order = 'desc' AND limit = 100` binds each to its query param today, no config needed. The only thing pushdown would add is SQL-clause ergonomics (`LIMIT 100` instead of `WHERE limit = 100`), which the pagination collision makes not worth it.

**Engine candidate (phase 2, not a v1 gate):** if the REST acquire path is taught to bound eager cursor pagination by the pushed LIMIT (mirroring the GraphQL path's `GetPushdownLimit`), a `top` pushdown on `limit` becomes a clean ergonomic win - `LIMIT n` fetches exactly one bounded page. Until that lands, no pushdown config is emitted.

## Open

1. **Live runbooks blocked on `OPENAI_API_KEY`** - the section 3 two-page traversal, the vector store cost-free lifecycle, the update-POST field-drop probes, rate-limit observation. All other phase 1 results are offline-proven; these execute unchanged when a key is present. (nvidia/vsphere blocked-on-key pattern.)
2. **Scope confirmations for the two added services** - `conversations` (Responses-family state; CRUD is clean metadata, items carry message content - the same content posture as the in-scope assistants thread messages) and `skills` (files-like versioned metadata; content endpoints already excluded as binary). Both are in the phase 1 build; strike this item if the maintainer concurs, or a one-line rule change in `clean_specs.mjs` removes either cleanly.
3. **Excluded-but-arguable families, recorded for the record** (not relitigated without new facts): `/audio/voice_consents` (consent records are metadata, but the audio family is data-plane and the surface is invocation-adjacent); `/videos` (Sora generation jobs are async-job-shaped, but generation is inference - the batches argument does not transfer because batch inputs are pre-priced files, video jobs are direct generation); ChatKit threads (session metadata, but the surface is beta and client-secret-coupled).
4. **`$.data[-1:].id` cursor for the fine_tuning list deviants** - negative-index JSONPath support in PaesslerAG/jsonpath v0.1.1 unverified (no Go toolchain here). If it works, jobs/events get transparent pagination too; if not, the shipped first-page posture stands. Phase 2, low priority.
5. **`responseTerminator` engine gap** - any-sdk config vocabulary carries it, the stackql loop ignores it; consuming it (`$.has_more == false`) would remove the one-request overshoot per traversal. Upstream ticket to file; not a v1 gate.
6. **openapi 3.1.0 through normalize/generate** - unexercised (nvidia finding); any breakage lands as deterministic downgrades in `pre_normalize.mjs`. Phase 2.
7. **`analyze` appends to an existing `all_services.csv`** - keycloak carry-over confirmed still true in provider-utils 0.7.6; delete before re-running `generate-mappings`. Candidate upstream fix.
