import { getModule } from "@damatjs/module";
import type { ModuleSampleService } from "./service";

export function moduleSampleService(): ModuleSampleService {
  const service = getModule("module-sample") as ModuleSampleService | null;
  if (!service) throw new Error("module-sample module not loaded");
  return service;
}
