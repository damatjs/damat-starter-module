# `api/` — the module's HTTP layer

**What it is.** The module's own HTTP endpoints. They are served by the
standalone dev server (`bun run dev`, with a built-in `/health`) and travel with
the module when it is installed into a backend.

**What goes here.** A single [`routes/`](./routes) folder. All HTTP lives under
it — there is nothing else to add at this level. See [`routes/README.md`](./routes/README.md).
