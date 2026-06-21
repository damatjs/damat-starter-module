import { ModuleService } from "@damatjs/services";
import { collectModels } from "@damatjs/orm-model";
import { ItemModel } from "./models";
import { schema } from "./config/schema";

// Pass models as an ARRAY — `collectModels` derives each accessor key from the
// model's TABLE NAME (camelCased), so you never re-type a redundant key.
// `model("items")` → `service.items`; `model("ai_sessions")` → `service.aiSessions`.
// The table name is the single source of truth (model, accessor, and links).
export const models = collectModels([ItemModel]);

/**
 * The service is the data + integration layer, and nothing else:
 *
 *  - Bare-bone CRUD for every registered model (provided by `ModuleService`).
 *  - Third-party integrations (Stripe, etc.) when a feature reaches beyond the
 *    model: the SDK import and its calls belong HERE — always as a do/reverse
 *    pair so steps can compensate. Keep files small: put each provider's SDK
 *    code in its own file under `./lib/<provider>.ts` and compose it on this
 *    class, e.g.
 *
 *      import { charge, refund } from "./lib/stripe";
 *      async chargeCard(args: ChargeArgs) { return charge(this.credentials, args); }
 *      async refundCharge(id: string)     { return refund(this.credentials, id); }
 *
 *    (Pure, SDK-free helpers go in `./utils/<concern>.ts` instead.)
 *
 * Business logic does NOT live here — it lives in steps/workflows, which reach
 * the service only through `getModule("module-sample")`.
 */
export class ModuleSampleService extends ModuleService({
  models,
  credentialsSchema: schema,
}) {}
