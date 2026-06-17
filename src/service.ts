import { ModuleService } from "@damatjs/module";
import { ItemModel } from "./models";
import { schema } from "./config/schema";

// Register every model under a key. `this.<key>` then exposes generated CRUD
// (create / find / findMany / update / delete) inside the service.
export const models = {
  item: ItemModel,
};

export class ModuleSampleService extends ModuleService({
  models,
  credentialsSchema: schema,
}) {
  /** Example of reading validated credentials. */
  greeting(): string {
    return this.credentials?.greeting ?? "hello";
  }

  /** Example of using the generated per-model CRUD. */
  async listItems() {
    return this.item.findMany({});
  }

  /** Example custom method wrapping a generated create. */
  async createItem(input: { name: string; note?: string }) {
    return this.item.create({
      data: { name: input.name, ...(input.note ? { note: input.note } : {}) },
      returning: ["id", "name"],
    });
  }
}
