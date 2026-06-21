import { describe, expect, test, beforeAll, afterAll } from "bun:test";
import { join } from "node:path";
import { bootModule, type BootedModule } from "@damatjs/module";
import type { ModuleSampleService } from "../src/service";

const MODULE_DIR = join(import.meta.dir, "../src");

// DB-gated: runs only when DATABASE_URL is set. The harness boots the module
// against a real Postgres and applies its migration first.
describe.skipIf(!process.env.DATABASE_URL)("module-sample service", () => {
  let booted: BootedModule<ModuleSampleService>;
  let itemId: string;

  beforeAll(async () => {
    const { default: moduleSampleModule } = await import("../src/index");
    booted = await bootModule(moduleSampleModule, { moduleDir: MODULE_DIR });
  });

  afterAll(async () => {
    if (itemId) await booted.service.items.delete({ where: { id: itemId } });
    await booted?.teardown();
  });

  test("creates and lists an item via bare CRUD", async () => {
    const created = await booted.service.items.create({
      data: { name: "first", note: "hi" },
    });
    itemId = created.id;
    expect(created.id).toStartWith("itm");
    expect(created.name).toBe("first");

    const items = await booted.service.items.findMany({});
    expect(items.length).toBeGreaterThan(0);
  });
});
