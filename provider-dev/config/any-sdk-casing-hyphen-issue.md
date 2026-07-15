# any-sdk work order: `casing.ToSnake` cannot alias hyphenated wire identifiers (HTTP headers)

**Repo**: `stackql/any-sdk`
**Type**: bug / enhancement
**Raised by**: the `openai` provider build (2026-07-15), evidence against any-sdk `eff549b` / stackql `2a0297b`

## Summary

`request.nativeCasing` exposes snake_case SQL aliases for wire identifiers, and it
works - verified end to end at the method level. But the alias generator is a
verbatim port of botocore's `xform_name`, which has no notion of hyphens. HTTP
header field names are hyphenated by convention, so **no header can ever get a
usable snake_case alias**, and every header parameter must be double-quoted in SQL.

## Evidence

`pkg/casing/casing.go`:

```go
func xform(name, sep string) string {
	// If the separator is already present, botocore treats the name as final.
	if strings.Contains(name, sep) { return name }     // sep is "_"
	...                                                 // only handles case boundaries
	return strings.ToLower(s3)
}
```

Hyphens are never treated as word separators, so for a header named
`OpenAI-Organization`:

- `ToSnake("OpenAI-Organization")` -> **`open_ai-_organization`** - an alias *is*
  created, but it is mangled and still hyphenated, so it still needs quoting.
- `ToSnake("openai-organization")` -> **identity** -> `GetParametersIncludingNativeCasing`
  skips it (`if snakeKey == wireKey { continue }`) -> **no alias at all**.
- The reverse retry in `GetParameter` (`casing.FromSnake(key, "kebab")` ->
  `openai-organization`) does not help either: stackql's WHERE resolution goes
  through the symbol table built from the alias set, so an unaliased key fails with
  `could not locate symbol openai_organization`.

Empirically (openai provider, `request.nativeCasing: kebab` stamped per method):

| SQL | result |
|---|---|
| `WHERE openai_organization = 'org-x'` | `could not locate symbol openai_organization` |
| `WHERE "open_ai-_organization" = 'org-x'` | **resolves** (reaches the API) - proves the alias path is live |
| `WHERE "openai-organization" = 'org-x'` | resolves (wire name, quoted) |

The middle row is the important one: the mechanism works, it is only the transform
that is wrong for this class of identifier.

There is no declared-name escape hatch: an HTTP header must be hyphenated to be the
header, and any unhyphenated spelling (`OpenaiOrganization`) is simply a different,
unrecognised header.

## Proposal

Treat `-` as a word separator in the snake transform, so hyphenated wire names
produce clean snake aliases:

- `ToSnake("openai-organization")` -> `openai_organization`
- `ToSnake("OpenAI-Organization")` -> `openai_organization` (or `open_ai_organization`
  under the existing acronym-collapse rules - either is usable; the first is
  preferable)

`FromSnake(snake, Kebab)` already does the inverse correctly
(`openai_organization` -> `openai-organization`), so only the forward transform is
missing. Implementation is contained: pre-split on `-` in `xform`, or normalise
hyphens to the separator before the regex passes.

Risk is low and bounded by the `nativeCasing` gate: the alias set only changes for
methods that declare a native casing, and only for wire names containing hyphens -
which today produce either garbage aliases (`open_ai-_organization`) or none.

## Acceptance

1. With `request.nativeCasing: kebab` and a header declared `openai-organization`:
   `WHERE openai_organization = 'org-x'` resolves and sends
   `openai-organization: org-x` on the wire.
2. Existing non-hyphenated behaviour is unchanged (`VPCId` -> `vpc_id`,
   `training_file` -> identity, no alias).
3. A snake alias never clobbers a real wire parameter of the same name (the
   existing guard in `GetParametersIncludingNativeCasing` is retained).

## Consumer impact

Until this lands, the `openai` provider declares the scoping headers with their
wire-valid lowercase kebab names and documents the quoted form:

```sql
WHERE "openai-organization" = 'org-...' AND "openai-project" = 'proj-...'
```

Once the transform handles hyphens, the same declaration yields
`WHERE openai_organization = ...` with no provider change - the kebab declaration
is already the correct forward-compatible setup.
