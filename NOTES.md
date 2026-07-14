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
