# `types/` — generated types

**What it is.** TypeScript row types + zod schemas derived from your models.

**What goes here.** Auto-generated files only — for each table a `<table>.ts`
(row types like `Items` / `NewItems` / `UpdateItems`) and a `<table>.zod.ts`
(runtime schemas like `newItemsSchema`, `updateItemsSchema`, `ItemsQuerySchema`),
plus the `index.ts` barrel. **Do not edit by hand** — they are overwritten on
every run.

**How it works.** `bun run codegen` reads `../models/` and regenerates these
files (generated zod imports come from `@damatjs/deps/zod`). Import from here
when you need a typed row or runtime validation, and re-run codegen whenever the
models change.
