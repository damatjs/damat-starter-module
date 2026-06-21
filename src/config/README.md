# `config/` — credentials (env → validated config)

**What it is.** How the module reads and validates its configuration from the
environment.

**What goes here.**
- `schema/index.ts` — a zod `schema` describing the credentials shape
- `load.ts` — `(env) => credentials`, mapping env vars into that shape
- `index.ts` — bundles `{ schema, load }` (consumed by `../index.ts`)

**How it works.** At boot the framework calls `load(process.env)` and validates
the result against `schema`; invalid config fails fast. The validated value is
then available as `this.credentials` inside the service (and is what a
third-party integration in `../lib/` would read — e.g.
`this.credentials?.greeting`).

**Declare every env var you read in [`../module.json#env`](../module.json)** —
that list drives `.env.example` sync when the module is installed. This skeleton
reads one optional var, `MODULE_SAMPLE_GREETING`; replace it with your real
config.
