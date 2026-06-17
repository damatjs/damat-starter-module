import { model, columns } from "@damatjs/module";

// Example model. Replace `items` with your own table(s). The ORM DSL gives you
// typed columns, relations, indexes, and timestamps; `migration:create` diffs
// this against the snapshot to produce SQL.
export const ItemModel = model("items", {
  id: columns.id({ prefix: "itm" }).primaryKey(),
  name: columns.text(),
  note: columns.text().nullable(),
}).timestamps();

export default ItemModel;
