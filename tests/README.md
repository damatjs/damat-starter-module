# `tests/` — the module's test suites

**What it is.** Standalone tests for the module — no full backend required.

**What goes here.**
- `contract.test.ts` — runs `validateModuleDir("../src")` to check `module.json`
  + registry readiness (always runs).
- `service.test.ts` — boots the module against Postgres and tests the service.
- add `workflow.test.ts` / `api.test.ts` as the module grows.

**How it works.** DB-backed suites are gated with
`describe.skipIf(!process.env.DATABASE_URL)`, so they skip cleanly when no
database is configured. With `DATABASE_URL` set, the harness from
`@damatjs/module` boots the module for the test:

- `bootModule(mod, { moduleDir })` — db + migrations + service, no HTTP server.
  Returns a `BootedModule` with `.service` and `.teardown()` (call it in
  `afterAll`).
- `startModuleApp({ port: 0 })` — the real HTTP server on a random port, for
  end-to-end route tests.

```ts
const { default: mod } = await import("../src/index");
const booted = await bootModule(mod, { moduleDir: join(import.meta.dir, "../src") });
// ... use booted.service.<model> / your service methods ...
await booted.teardown();
```

Run everything with `bun test`.
