# `workflows/` — the module's steps + workflows

**What it is.** The orchestration layer between routes and the service, built on
`@damatjs/workflow-engine`. Steps are units of work with a compensation/fallback;
workflows compose steps and roll back cleanly on failure.

**What's here.** A **generated** CRUD slice per table (scaffold-once — your edits
survive): `items/steps/{create,update,delete,find,findMany}Items.ts` (each a
`createStep(...)` with a reverse/fallback) and `items/workflows/{...}.ts`. Add
custom (non-CRUD) workflows alongside them.

**How it works.** A step reaches the service via the typed
`getModule("module-sample")` — only steps touch the service. Steps are
**directly callable**, so a single-step workflow body is just
`(input, ctx) => createItemsStep(input, ctx)` — no `Effect.gen`/`executeStep`
boilerplate. For multi-step, compose in `Effect.gen` with
`yield* step(input, ctx)`; if a later step fails, earlier compensations run in
reverse order.

```ts
// steps/createItems.ts
import { createStep } from "@damatjs/workflow-engine";
import { getModule } from "@damatjs/framework";
import type { NewItems, Items } from "../../../types/index";

export const createItemsStep = createStep<NewItems, Items>(
  "module-sample.items.create",
  async (input, _ctx) => {
    const service = getModule("module-sample");
    if (!service) throw new Error("module-sample module not loaded");
    return service.items.create({ data: input });
  },
  // Reverse: undo the create if a later step fails.
  async (_input, created, _ctx) => {
    const service = getModule("module-sample");
    if (!service) return;
    await service.items.delete({ where: { id: created.id } });
  },
);

// workflows/createItems.ts — single step, called directly:
export const createItemsWorkflow = createWorkflow<NewItems, Items>(
  "module-sample.items.create",
  (input, ctx) => createItemsStep(input, ctx),
);

// const result = await createItemsWorkflow.execute({ name: "first" });
// result.success ? result.result : result.error
```
