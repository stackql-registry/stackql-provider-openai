#!/usr/bin/env bash
# Fetch, validate and pin the OpenAI OpenAPI spec. See provider-dev/scripts/fetch_spec.mjs.
set -euo pipefail
cd "$(dirname "$0")/.."
node provider-dev/scripts/fetch_spec.mjs "$@"
