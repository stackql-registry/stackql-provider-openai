# any-sdk work order: generalise `orderBy` pushdown beyond OData

**Repo**: `stackql/any-sdk`
**Type**: enhancement
**Raised by**: the `openai` provider build (2026-07-15), evidence against any-sdk `eff549b` / stackql `2a0297b`

## Summary

`queryParamPushdown` is generic for `top`, `skip`, `count` and `select` - each is
driven by a configurable `paramName` and works with any vendor. `orderBy` and
`filter` are not: both hard-require the OData dialect and emit an OData-shaped
value, so an API that expresses ordering with any other convention cannot use the
pushdown at all. This asks for `orderBy` to take a **custom directive** the same way
`top` does. (`filter` is deliberately out of scope here - vendor filter DSLs are a
much larger problem; see Non-goals.)

## Current behaviour

`internal/anysdk/query_param_pushdown_apply.go`:

```go
func applyPushdownOrderBy(qpp QueryParamPushdown, intent PushdownIntent, res *standardPushdownResult) {
	orderBy := intent.GetOrderBy()
	if len(orderBy) == 0 { return }
	ob, ok := qpp.GetOrderBy()
	if !ok { return }
	// Only the OData syntax has a well-defined "col asc|desc" rendering here.
	if !strings.EqualFold(ob.GetSyntax(), ODataDialect) { return }
	...
	parts = append(parts, o.GetColumn()+" "+dir)   // renders `created_at desc`
	res.queryParams[paramName] = strings.Join(parts, ",")
}
```

Two hard constraints fall out:

1. **Dialect gate** - anything other than `syntax: odata` returns early, emitting nothing.
2. **Fixed rendering** - the value is always `<column> <asc|desc>`, comma-joined.

Contrast `applyPushdownTop`, which has no dialect gate and honours any `paramName`.
That asymmetry is the bug: the framework is generic in principle but OData-only in
two of its six directives.

## Motivating case (OpenAI)

OpenAI list endpoints order by a fixed column (`created_at`) and take **direction
only**:

```
GET /v1/containers?order=desc      # asc | desc
```

There is no way to express this today:

- `syntax: odata` renders `created_at desc`, which OpenAI rejects.
- Any other `syntax` value renders nothing (the gate).

So `ORDER BY created_at DESC` cannot be pushed down, even though the wire
parameter is trivial. The provider currently exposes `order` as an ordinary WHERE
parameter (`WHERE "order" = 'desc'`), which works but is not the SQL idiom users
expect, and it cannot participate in the planner's ordering.

This shape is not OpenAI-specific: direction-only ordering is common (Stripe's
`created[gt]`-style APIs, GitHub's `?direction=asc`, many cursor APIs).

## Proposal

Give `orderBy` a **render directive**, defaulting to today's behaviour so nothing
regresses. Sketch:

```yaml
x-stackQL-config:
  queryParamPushdown:
    orderBy:
      paramName: order
      algorithm: direction_only     # new; default remains the odata rendering
      supportedColumns: [created_at]
```

Suggested algorithms:

| algorithm | renders | example |
|---|---|---|
| `odata` (default, current) | `col asc\|desc`, comma-joined | `$orderby=created_at desc` |
| `direction_only` | just `asc`/`desc`; requires exactly one order term whose column is in `supportedColumns` | `order=desc` |
| `column_only` | just the column name | `sort=created_at` |

`direction_only` must refuse (emit nothing, leaving the ORDER BY client-side) when
more than one order term is present or the column is unsupported - the existing
all-or-nothing guard already models this correctly.

A more general alternative is a template (`valueTemplate: '{{ .Direction }}'`),
consistent with the existing request-body `transform` mechanism. Named algorithms
are simpler to validate and match the existing `PaginationAlgorithm*` precedent
(`page_number`, `odata_next_link`), so they are the recommendation; a template is
the fallback if the algorithm set proliferates.

## Acceptance

1. `orderBy` with `algorithm: direction_only`, `paramName: order`,
   `supportedColumns: [created_at]`:
   - `ORDER BY created_at DESC` -> `?order=desc`
   - `ORDER BY created_at ASC` -> `?order=asc`
   - `ORDER BY name DESC` -> nothing emitted (column unsupported; stays client-side)
   - `ORDER BY created_at, name` -> nothing emitted (multi-term)
2. Existing OData configs are byte-identical (default path unchanged).
3. Client-side ORDER BY remains authoritative in every case - pushdown stays a pure
   optimisation, so a refused render can never change results.

## Non-goals

- **`filter`**: deliberately excluded. Vendor filter DSLs vary far more than
  ordering (discrete named params, bracket operators, bespoke grammars), so a
  useful generalisation needs its own design. Ordering is a small, closed problem
  worth solving first.

## Related

- REST cursor traversal is not bounded by a pushed `top`/LIMIT: `GetPushdownLimit`
  is consumed only in stackql's GraphQL acquire path
  (`internal/stackql/primitivebuilder/graphql_single_select_acquire.go`), while the
  REST loop (`execution/mono_valent_execution.go`) terminates only on token
  absence or the global `HTTPPageLimit`. Tracked separately; it makes a small
  pushed LIMIT shrink page size without reducing rows fetched.
- `casing.ToSnake` cannot alias hyphenated wire identifiers - see
  `any-sdk-casing-hyphen-issue.md`.
