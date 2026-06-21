import { defineModule } from "@damatjs/services";
import { ModuleSampleService, models } from "./service";
import credentials from "./config";

export const MODULE_ID = "module-sample";

export { ModuleSampleService, models };

// The `ModuleRegistry` augmentation that makes `getModule("module-sample")`
// resolve to `ModuleSampleService` is generated into `./types/registry.ts`
// by codegen — nothing to hand-author here.

export default defineModule(MODULE_ID, {
  service: ModuleSampleService,
  credentials: credentials.load,
});
