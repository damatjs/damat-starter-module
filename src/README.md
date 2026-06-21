# `src/` — the module (what gets inserted into a backend)

Everything under `src/` **is** the portable module. On `damat module add` the
module is **split**: the model/service/types/migrations/config stay under a
backend's `src/modules/<id>/`, while the generated routes and workflows move into
the app's `src/api/routes` and `src/workflows`. It must stay self-contained:

- **Import from the real packages** (not the `@damatjs/module` umbrella):
  `defineModule`/`ModuleService` ← `@damatjs/services`, `getModule` ←
  `@damatjs/framework`, `model`/`columns`/`collectModels` ← `@damatjs/orm-model`,
  workflow helpers ← `@damatjs/workflow-engine`, route types ←
  `@damatjs/framework/router`, `z` ← `@damatjs/deps/zod`. `@damatjs/module`
  itself only carries contract/config/runtime/tooling.
- **No cross-module internals:** store foreign ids as plain columns (no FKs
  across modules), and if it pairs with another module leave a non-binding
  `pairsWith` hint in `module.json` — composition is the app's job.

| File / folder | Purpose |
|---------------|---------|
| `module.json` | the portable manifest (name, env, packages, registry, `pairsWith`) |
| `index.ts` | `defineModule(...)` — the module's public definition |
| `service.ts` | the service — `collectModels([...])` + CRUD/integrations only |
| `lib/` | *(optional)* third-party SDK code, one file per provider, called by the service |
| `utils/` | *(optional)* small pure helpers, one concern per file |
| `config/` | credentials: a zod schema + an env loader |
| `models/` | ORM model definitions |
| `migrations/` | generated SQL (append-only once applied) |
| `types/` | GENERATED row types + zod + `registry.ts` (the `getModule` typing) |
| `api/routes/` | GENERATED HTTP routes (scaffold-once) |
| `workflows/` | GENERATED steps + workflows (scaffold-once) |

The two top-level files wire the module together: `index.ts` registers the
service and credentials with `defineModule`; `service.ts` turns
`collectModels([...])` into a service with generated CRUD, reachable from steps
via the typed `getModule("module-sample")`. There is **no `accessor.ts`** — the
`ModuleRegistry` augmentation that types `getModule` is generated into
`types/registry.ts`.

> The per-folder READMEs in here are teaching aids for the template — delete them
> when you turn this skeleton into a real module.
