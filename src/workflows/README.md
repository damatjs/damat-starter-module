# `workflows/` — the module's sagas

**What it is.** Multi-step operations that belong to this module and must roll
back cleanly on failure — sagas with per-step compensation, built on
`@damatjs/workflow-engine` (re-exported from `@damatjs/module`).

**What goes here.** Step and workflow definitions, re-exported from `index.ts`
(empty in this skeleton). As workflows grow, a common layout is `steps/<name>/`
for the individual steps and `workflows/<name>.ts` for the composition.

**How it works.** Define each step with `createStep(name, invoke, compensate?)`,
compose steps inside `Effect.gen` with `createWorkflow` + `executeStep`, then run
with `.execute(input)`. If a later step fails, earlier steps' compensations run
in reverse order:

```ts
import { createStep, createWorkflow, executeStep, Effect } from "@damatjs/module";
import { moduleSampleService } from "../accessor";

const createItem = createStep(
  "create-item",
  async (input: { name: string }) => moduleSampleService().createItem(input),
  // Compensation — runs if a later step fails.
  async (_input, item) =>
    moduleSampleService().item.delete({ where: { id: item.id } }),
);

export const addItem = createWorkflow("add-item", (input: { name: string }, ctx) =>
  Effect.gen(function* () {
    const item = yield* executeStep(createItem, input, ctx);
    return item;
  }),
);

// const result = await addItem.execute({ name: "first" });
// result.success ? result.result : result.error  (result.compensated tells you if rollback ran)
```
