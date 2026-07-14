# Engineering Notes

Phase 1 working notes for the next-generation `openai` provider (in-situ replacement of v1). Each item records what was investigated, the evidence, and what remains open. Sibling findings reused, not re-derived: snowflake (replacement discipline, Breaking Changes mechanics), anthropic (model-vendor scope posture), nvidia/oci (deprecation-as-build-input, blocked-on-key gating), keycloak (REPLACE-vs-UPDATE, numbered Open list format). Reference pattern: stackql-provider-k8s (branch `feature/provider-dev`).

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

**Website state.** Docusaurus site with committed `build/` output, deploy workflows `.github/workflows/{prod,test}-web-deploy.yml` (Netlify-era CNAME in build/), site `openai-provider.stackql.io`. `star-check.yml` is deleted in the working tree (pre-existing local change, carried into the first commit).

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
- Config placement is service-level `x-stackQL-config` (the k8s/jira/snowflake finding: provider-level inheritance is broken in any-sdk).

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
