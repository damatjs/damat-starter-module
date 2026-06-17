import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { validateModuleDir } from "@damatjs/module";

describe("module-sample module contract", () => {
  test("module directory passes validation", () => {
    const report = validateModuleDir(join(import.meta.dir, "../src"));
    expect(report.errors).toEqual([]);
    expect(report.valid).toBe(true);
  });
});
