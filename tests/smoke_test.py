#!/usr/bin/env python3
"""Live smoke test for the openai StackQL provider (pystackql).

Exercises the provider against the real OpenAI API using an API key supplied via
the OPENAI_API_KEY environment variable. Runs cost-free read and metadata
lifecycles by default (ungated); the token-consuming completions demonstration is
opt-in (--with-completions, the gated tier).

Runs against the local generated provider (default) or the published provider in
the registry:

    python tests/smoke_test.py                     # local provider (provider-dev/openapi)
    python tests/smoke_test.py --registry public   # published provider (registry pull openai)
    python tests/smoke_test.py --with-completions   # also run the gated completions demo
    python tests/smoke_test.py --cleanup-only       # just sweep stackql-smoke breadcrumbs

Auth: the provider declares `bearer` auth on OPENAI_API_KEY, so no credential is
passed on the command line - stackql reads it from the environment. Only the
resolution checks (SHOW/DESCRIBE) work without a key; the live steps report as
BLOCKED when OPENAI_API_KEY is absent.

Scope note: chat/completions is inference (the data plane) and is deliberately
NOT part of this provider. The --with-completions step therefore calls the OpenAI
API directly (same key), separately from the provider, purely to demonstrate the
key works end to end and return a real answer.
"""

import argparse
import json
import os
import platform
import sys
import time
import urllib.request
import urllib.error

try:
    from pystackql import StackQL
except ImportError:
    sys.exit("pystackql is not installed. Install it with: pip install pystackql")

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL_REGISTRY_DIR = os.path.join(REPO_ROOT, "provider-dev", "openapi")
SMOKE_PREFIX = "stackql-smoke"
IS_WINDOWS = platform.system().startswith("Win")


class Reporter:
    """Tracks step outcomes and prints a final summary."""

    def __init__(self):
        self.results = []  # (name, status, detail)

    def record(self, name, status, detail=""):
        self.results.append((name, status, detail))
        symbol = {"PASS": "[ PASS ]", "FAIL": "[ FAIL ]", "SKIP": "[ SKIP ]", "BLOCKED": "[BLOCK ]"}[status]
        line = f"{symbol} {name}"
        if detail:
            one_line = " ".join(str(detail).split())
            if len(one_line) > 140:
                one_line = one_line[:137] + "..."
            line += f" - {one_line}"
        print(line, flush=True)

    def summary(self):
        counts = {}
        for _, status, _ in self.results:
            counts[status] = counts.get(status, 0) + 1
        print("\n" + "=" * 60)
        print("Summary: " + ", ".join(f"{k}={v}" for k, v in sorted(counts.items())))
        print("=" * 60)
        return counts.get("FAIL", 0) == 0


def build_stackql(registry_mode):
    """Return a StackQL instance configured for the chosen registry."""
    sq = StackQL(output="dict")
    if registry_mode == "local":
        if not os.path.isdir(LOCAL_REGISTRY_DIR):
            sys.exit(f"local registry not found at {LOCAL_REGISTRY_DIR}; run the generate stage first")
        reg_path = LOCAL_REGISTRY_DIR.replace("\\", "/")
        full = {
            "url": f"file://{reg_path}",
            "localDocRoot": reg_path,
            "verifyConfig": {"nopVerify": True},
        }
        compact = json.dumps(full, separators=(",", ":"))
        # pystackql joins params into one shell string (shell=True), so the registry
        # JSON must survive the platform shell: escaped double quotes on Windows cmd,
        # single-quote wrapping on POSIX sh.
        reg_arg = ('"' + compact.replace('"', '\\"') + '"') if IS_WINDOWS else ("'" + compact + "'")
        params = sq.params
        if "--registry" in params:
            i = params.index("--registry")
            params[i + 1] = reg_arg
        else:
            params.extend(["--registry", reg_arg])
    return sq


def rows_of(result):
    """Normalise a pystackql execute() result to (rows, error)."""
    if isinstance(result, list):
        if len(result) == 1 and isinstance(result[0], dict) and set(result[0]) <= {"error", "exception"}:
            return [], str(result[0].get("error") or result[0].get("exception"))
        # surface an error key mixed into rows
        for r in result:
            if isinstance(r, dict) and "error" in r and len(r) == 1:
                return [], str(r["error"])
        return result, None
    if isinstance(result, dict) and ("error" in result or "exception" in result):
        return [], str(result.get("error") or result.get("exception"))
    return result, None


def q(sq, query):
    return rows_of(sq.execute(query, suppress_errors=False))


def stmt(sq, query):
    """Run a mutation/EXEC/REGISTRY statement. executeStmt surfaces API errors as
    a list like [{'error': '...'}] (unlike execute, which swallows SELECT errors to
    an empty list), so mutations give a reliable pass/fail signal."""
    out = sq.executeStmt(query)
    if isinstance(out, list):
        for item in out:
            if isinstance(item, dict) and item.get("error"):
                return ("", str(item["error"]).strip())
        return (str(out), None)
    if isinstance(out, dict):
        err = out.get("error") or out.get("exception")
        return (out.get("message", ""), str(err).strip() if err else None)
    return (str(out), None)


def sweep_breadcrumbs(sq, rep, key_present):
    """Delete any vector stores whose name starts with the smoke prefix."""
    if not key_present:
        rep.record("cleanup: sweep prior breadcrumbs", "BLOCKED", "OPENAI_API_KEY not set")
        return
    rows, err = q(sq, "SELECT id, name FROM openai.vector_stores.vector_stores")
    if err:
        rep.record("cleanup: list vector stores", "FAIL", err)
        return
    stale = [r for r in rows if str(r.get("name", "")).startswith(SMOKE_PREFIX)]
    for r in stale:
        _, derr = stmt(sq, f"DELETE FROM openai.vector_stores.vector_stores WHERE vector_store_id = '{r['id']}'")
        status = "FAIL" if derr else "PASS"
        rep.record(f"cleanup: delete {r['name']}", status, derr or r["id"])
    rep.record("cleanup: sweep prior breadcrumbs", "PASS", f"{len(stale)} swept")


def check_resolution(sq, rep):
    rows, err = q(sq, "SHOW SERVICES IN openai")
    if err:
        rep.record("resolution: SHOW SERVICES", "FAIL", err)
        return False
    names = sorted(str(r.get("name")) for r in rows)
    ok = len(names) == 11
    rep.record("resolution: SHOW SERVICES", "PASS" if ok else "FAIL", f"{len(names)} services")
    return ok


def read_smokes(sq, rep, key_present):
    if not key_present:
        rep.record("read: models / files list", "BLOCKED", "OPENAI_API_KEY not set")
        return
    # A valid key always returns the base model list, so 0 models with a key set is
    # a reliable auth/connectivity failure signal (SELECT errors are otherwise
    # swallowed to an empty result by pystackql).
    rows, err = q(sq, "SELECT id FROM openai.models.models")
    if err:
        rep.record("read: list models", "FAIL", err)
    elif len(rows) == 0:
        rep.record("read: list models", "FAIL", "0 models - check auth/connectivity (a valid key always returns models)")
    else:
        rep.record("read: list models", "PASS", f"{len(rows)} models")

    rows, err = q(sq, "SELECT id, filename, purpose FROM openai.files.files")
    rep.record("read: list files (metadata)", "FAIL" if err else "PASS", err or f"{len(rows)} files (0 is valid)")

    # derived-cursor / limit: a bounded read should return at most 2 rows
    rows, err = q(sq, "SELECT id FROM openai.files.files WHERE \"limit\" = 2")
    detail = err or f"{len(rows)} rows (limit=2)"
    rep.record("read: files with limit=2 param", "FAIL" if err else "PASS", detail)


def vector_store_lifecycle(sq, rep, key_present, stamp):
    if not key_present:
        rep.record("lifecycle: vector store create/get/update/delete", "BLOCKED", "OPENAI_API_KEY not set")
        return
    name = f"{SMOKE_PREFIX}-{stamp}"

    _, err = stmt(sq, f"INSERT INTO openai.vector_stores.vector_stores(name) SELECT '{name}'")
    if err:
        rep.record("lifecycle: create vector store", "FAIL", err)
        return
    rep.record("lifecycle: create vector store", "PASS", name)

    rows, err = q(sq, "SELECT id, name, status FROM openai.vector_stores.vector_stores")
    match = next((r for r in rows if r.get("name") == name), None) if not err else None
    if err or not match:
        rep.record("lifecycle: find created store in list", "FAIL", err or "not found")
        return
    vsid = match["id"]
    rep.record("lifecycle: find created store in list", "PASS", vsid)

    rows, err = q(sq, f"SELECT id, name, status FROM openai.vector_stores.vector_stores WHERE vector_store_id = '{vsid}'")
    got = (not err) and len(rows) == 1 and rows[0].get("id") == vsid
    rep.record("lifecycle: get store by id", "PASS" if got else "FAIL", err or (rows[0].get("status") if got else "mismatch"))

    _, err = stmt(sq, f"UPDATE openai.vector_stores.vector_stores SET name = '{name}-updated' WHERE vector_store_id = '{vsid}'")
    rep.record("lifecycle: update store name", "FAIL" if err else "PASS", err or f"{name}-updated")

    _, err = stmt(sq, f"DELETE FROM openai.vector_stores.vector_stores WHERE vector_store_id = '{vsid}'")
    rep.record("lifecycle: delete store", "FAIL" if err else "PASS", err or vsid)

    rows, err = q(sq, "SELECT id FROM openai.vector_stores.vector_stores")
    gone = (not err) and all(r.get("id") != vsid for r in rows)
    rep.record("lifecycle: confirm store deleted", "PASS" if gone else "FAIL", err or ("gone" if gone else "still present"))


def completions_demo(sq, rep, key_present, model):
    """Direct OpenAI API call (inference is out of provider scope) - gated."""
    if not key_present:
        rep.record("gated: completions demo", "BLOCKED", "OPENAI_API_KEY not set")
        return
    api_key = os.environ["OPENAI_API_KEY"]
    body = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": "Explain how StackQL works in two sentences."}],
        "max_tokens": 150,
    }).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=body,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            payload = json.loads(resp.read())
        answer = payload["choices"][0]["message"]["content"].strip()
        rep.record("gated: completions demo (direct, out of provider scope)", "PASS", f"model={model}")
        print("\n  --- completion ---")
        for line in answer.splitlines():
            print(f"  {line}")
        print("  ------------------")
    except urllib.error.HTTPError as e:
        rep.record("gated: completions demo", "FAIL", f"HTTP {e.code}: {e.read().decode()[:120]}")
    except Exception as e:  # noqa: BLE001
        rep.record("gated: completions demo", "FAIL", repr(e)[:120])


def main():
    ap = argparse.ArgumentParser(description="Live smoke test for the openai StackQL provider.")
    ap.add_argument("--registry", choices=["local", "public"], default="local",
                    help="local generated provider (default) or published provider via registry pull")
    ap.add_argument("--with-completions", action="store_true",
                    help="run the gated, token-consuming completions demonstration (direct API call)")
    ap.add_argument("--model", default="gpt-4o-mini", help="model for the completions demo (default gpt-4o-mini)")
    ap.add_argument("--cleanup-only", action="store_true", help="only sweep stackql-smoke breadcrumbs, then exit")
    args = ap.parse_args()

    key_present = bool(os.environ.get("OPENAI_API_KEY"))
    stamp = str(int(time.time()))
    rep = Reporter()

    print(f"openai provider smoke test | registry={args.registry} | key={'set' if key_present else 'ABSENT'}\n")

    sq = build_stackql(args.registry)

    if args.registry == "public":
        out, err = stmt(sq, "REGISTRY PULL openai")
        rep.record("registry pull openai", "FAIL" if err else "PASS", err or "pulled")
        if err:
            sys.exit(1)

    if not check_resolution(sq, rep):
        rep.summary()
        sys.exit(1)

    sweep_breadcrumbs(sq, rep, key_present)

    if args.cleanup_only:
        ok = rep.summary()
        sys.exit(0 if ok else 1)

    read_smokes(sq, rep, key_present)
    vector_store_lifecycle(sq, rep, key_present, stamp)

    if args.with_completions:
        completions_demo(sq, rep, key_present, args.model)

    ok = rep.summary()
    if not key_present:
        print("\nNote: live steps were BLOCKED. Set OPENAI_API_KEY to run them.")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
