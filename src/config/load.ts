// Map environment variables into the credentials shape (see config/schema).
// Declare every var you read here in src/module.json#env.
export const load = (env: NodeJS.ProcessEnv) => ({
  greeting: env.MODULE_SAMPLE_GREETING || "hello",
});
