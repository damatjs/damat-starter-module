import { z } from "@damatjs/module";

// Credentials schema. The loader (config/load.ts) reads env into this shape and
// it is validated at boot. Replace `greeting` with your module's real config.
export const schema = z.object({
  greeting: z.string().default("hello"),
});

export type schemaType = z.infer<typeof schema>;
