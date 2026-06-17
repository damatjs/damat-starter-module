import { z, type RouteHandler, type RouteValidator } from "@damatjs/module";
import { moduleSampleService } from "../../../accessor";

/** GET /api/items — list items */
export const GET: RouteHandler = async (c) => {
  const service = moduleSampleService();
  const items = await service.listItems();
  return c.json({ success: true, greeting: service.greeting(), data: items });
};

/** POST /api/items — create an item */
export const POST: RouteHandler = async (c) => {
  const body = await c.req.json();
  const service = moduleSampleService();
  const item = await service.createItem(body);
  return c.json({ success: true, data: item }, 201);
};

const createSchema = z.object({
  name: z.string().min(1),
  note: z.string().optional(),
});

export const validators: RouteValidator[] = [
  { method: "POST", body: createSchema },
];
