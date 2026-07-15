#!/usr/bin/env bash

# Thin passthrough to generate-provider.mjs (kept for bash users; `npm run
# generate-provider` calls generate-provider.mjs directly). Passing every
# argument straight through means the .mjs getArg surface is the single source
# of truth - the wrapper can never silently drop a flag it does not recognise
# (the failure mode the arg-re-parsing wrapper had with --service-config).

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

node "$SCRIPT_DIR/generate-provider.mjs" "$@"
