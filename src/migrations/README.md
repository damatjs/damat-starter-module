# `migrations/` — generated SQL migrations

**What it is.** This module's schema history.

**What goes here.** Auto-generated files only: `MigrationYYYYMMDD…_*.sql` and
`schema-snapshot.json` (the last-known schema state the diff runs against).
**Do not hand-write these**, and never edit a migration that has already been
applied somewhere.

**How it works.** `bun run migration:create` diffs your `../models/` against
`schema-snapshot.json`, writes a new SQL file, and updates the snapshot.
Migrations are **append-only** once published — to change the schema, add a new
migration rather than editing an old one. A backend applies them with
`damat-orm migrate:up` (wrapped as `bun run db:migrate` in an app).
