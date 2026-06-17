import { defineModule } from "@damatjs/module";
import { ModuleSampleService, models } from "./service";
import credentials from "./config";

export const MODULE_ID = "module-sample";

export { ModuleSampleService, models };

declare module "@damatjs/services" {
  interface ModuleRegistry {
    "module-sample": ModuleSampleService;
  }
}

export default defineModule(MODULE_ID, {
  service: ModuleSampleService,
  credentials: credentials.load,
});
