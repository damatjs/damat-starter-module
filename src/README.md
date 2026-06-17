# `src/` — the module (what gets inserted into a backend)

Everything under `src/` **is** the portable module. `damat module add` copies
this folder into a backend's `src/modules/<id>/`, so it must stay self-contained:

- **One import surface:** import only from `@damatjs/module` (plus the generated
  `@damatjs/deps/zod` in codegen output).
- **No cross-module internals:** reference other modules by id (in
  `module.json#modules`) and store foreign ids as plain columns — no FKs across
  modules.

| File / folder | Purpose |
|---------------|---------|
| `module.json` | the portable manifest (name, env, packages, registry metadata) |
| `index.ts` | `defineModule(...)` + the `ModuleRegistry` type augmentation |
| `accessor.ts` | typed `getModule()` helper for routes and workflow steps |
| `service.ts` | the service — the models map + business methods |
| `config/` | credentials: a zod schema + an env loader |
| `models/` | ORM model definitions |
| `migrations/` | generated SQL (append-only once applied) |
| `types/` | generated row types + zod schemas |
| `api/routes/` | the module's HTTP routes |
| `workflows/` | the module's sagas |

The three top-level files wire the module together: `index.ts` registers the
service and credentials with `defineModule`, `service.ts` turns the models map
into a service with generated CRUD (`this.<model>`), and `accessor.ts` is how
routes and steps fetch the booted service in a typed way.

> The per-folder READMEs in here are teaching aids for the template — delete them
> when you turn this skeleton into a real module.
