# `api/routes/` — file-based HTTP routes

**What it is.** This module's endpoints. The folder path becomes the URL path —
`items/route.ts` → `/api/items`. Only files named `route.ts` are mounted.

**What goes here.** One `route.ts` per endpoint, exporting a handler per HTTP
method (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) typed as `RouteHandler`, plus an
optional `validators` array that validates the request with zod before the
handler runs. See [`items/route.ts`](./items/route.ts) for the worked example.

**How it works.** Reach the service through the typed accessor
(`../../../accessor.ts`) — never a global:

```ts
import { type RouteHandler } from "@damatjs/module";
import { moduleSampleService } from "../../../accessor";

export const GET: RouteHandler = async (c) =>
  c.json({ success: true, data: await moduleSampleService().listItems() });
```
