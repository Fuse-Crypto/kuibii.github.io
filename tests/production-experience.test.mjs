import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("production header keeps only the public distribution navigation", () => {
  const source = readFileSync(new URL("../src/components/experience.tsx", import.meta.url), "utf8");
  assert.match(source, /to="\/".*Conditional Distribution/s);
  assert.match(source, /to="\/games".*Games/s);
  assert.match(source, /to="\/incentives".*Incentives/s);
  assert.match(source, /to="\/how-it-works".*How it works/s);
  assert.match(source, /!production &&/);
  assert.match(source, /isProductionHostname/);
});

test("conditional distribution production view hides sections 02 through 07", () => {
  const source = readFileSync(new URL("../src/routes/index.tsx", import.meta.url), "utf8");
  const productionGuard = source.indexOf("{!production && (");

  assert.notEqual(productionGuard, -1);
  assert.ok(source.indexOf("<Section n=\"02\"", productionGuard) > productionGuard);
  assert.ok(source.indexOf("<Section n=\"07\"", productionGuard) > productionGuard);
});
