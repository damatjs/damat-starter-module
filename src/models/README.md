# `models/` — ORM model definitions

**What it is.** Your module's database tables, defined with the `@damatjs` ORM
model DSL.

**What goes here.** One model per file, re-exported from `index.ts`. See
`item.ts` for the example.

**How it works.**

```ts
import { model, columns } from "@damatjs/module";

export const ItemModel = model("items", {
  id: columns.id({ prefix: "itm" }).primaryKey(), // generated ids, prefixed "itm…"
  name: columns.text(),
  note: columns.text().nullable(),
}).timestamps(); // adds created_at / updated_at / deleted_at (soft-delete)
```

Register each model under a key in `../service.ts` — that key becomes
`this.<key>` (with generated `create` / `find` / `findMany` / `update` /
`delete`) inside the service. After any model change, run
`bun run migration:create` to diff the schema, then `bun run codegen` to
regenerate `../types/`.
