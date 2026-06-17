# `items/` — example route (`/api/items`)

`route.ts` is the worked example referenced by [`../README.md`](../README.md):

- `GET /api/items` — lists items (and echoes `service.greeting()` from config).
- `POST /api/items` — creates an item; its body is validated against
  `{ name: string (min 1), note?: string }` by the exported `validators` array
  before the handler runs.

Both reach the service through the typed accessor (`../../../accessor.ts`) and
return `{ success: true, data }` (the `POST` with status `201`).

To add an endpoint, copy this shape — a `<name>/route.ts` folder maps to
`/api/<name>`. Delete this folder once you've replaced the example with your own.
