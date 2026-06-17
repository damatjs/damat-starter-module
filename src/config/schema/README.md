# `config/schema/` — the credentials zod schema

**What it is.** `index.ts` exports `schema`: the zod object describing this
module's validated configuration (and `schemaType`, its inferred TypeScript
type).

**How it works.** `../load.ts` builds a value of this shape from environment
variables; the framework validates `load(process.env)` against `schema` at boot,
and the result becomes `this.credentials` inside the service.

```ts
import { z } from "@damatjs/module";

export const schema = z.object({
  greeting: z.string().default("hello"),
});

export type schemaType = z.infer<typeof schema>;
```

Add fields here as your module gains config, and keep them in sync with
`../load.ts` and the declared vars in [`../../module.json#env`](../../module.json).
