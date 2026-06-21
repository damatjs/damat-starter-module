# `api/routes/` — file-based HTTP routes (generated)

**What it is.** This module's endpoints. The folder path becomes the URL path —
`items/route.ts` → `/api/items`. Only files named `route.ts` are mounted. On
install these are relocated to the app's `src/api/routes/<table>/…` (keyed by
the table name, the source of truth — not the module id).

**What's here.** One folder per resource, scaffolded by codegen as split files:
`api.ts` (handlers), `validator.ts` (`RouteValidator[]`), `query.ts` (query
schema), `middleware.ts`, and `route.ts` (the assembler the router mounts). A
`[id]/` subfolder holds the single-resource routes (`GET`/`PATCH`/`DELETE`).
These are **scaffolded once** — edit them freely; codegen won't overwrite them.

**How it works (the layering rule).** A route calls a **workflow** — never the
service directly. The workflow orchestrates **steps**, and only steps reach the
service (bare CRUD) via the typed `getModule("<module>")`:

```ts
// api.ts
import type { RouteHandler } from "@damatjs/framework/router";
import { findManyItemsWorkflow } from "../../../workflows/items/workflows/findManyItems";
import { ItemsQuerySchema } from "./query";

export const GET: RouteHandler = async (c) => {
  const query = ItemsQuerySchema.parse(c.req.query());
  const result = await findManyItemsWorkflow.execute(query);
  if (!result.success) {
    return c.json({ success: false, error: result.error?.message ?? "failed" }, 500);
  }
  return c.json({ success: true, data: result.result });
};
```

Run `damat module codegen` to (re)generate the types and the CRUD slice.
