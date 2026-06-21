# `models/` — ORM model definitions

**What it is.** Your module's database tables, defined with the `@damatjs` ORM
model DSL.

**What goes here.** One model per file, re-exported from `index.ts`. See
`item.ts` for the example.

**How it works.**

```ts
import { model, columns } from "@damatjs/orm-model";

export const ItemModel = model("items", {
  id: columns.id({ prefix: "itm" }).primaryKey(), // generated ids, prefixed "itm…"
  name: columns.text(),
  note: columns.text().nullable(),
}).timestamps(); // adds created_at / updated_at / deleted_at (soft-delete)
```

Register each model in `../service.ts` by adding it to the
`collectModels([...])` array — the accessor key is derived from the model's
**table name** (camelCased), so `model("items")` becomes `service.items` (with
generated `create` / `find` / `findMany` / `update` / `delete`). The table name
is the single source of truth — there is no hand-written key. After any model
change, run `bun run migration:create` to diff the schema, then
`bun run codegen` to regenerate `../types/` and the CRUD slice.
