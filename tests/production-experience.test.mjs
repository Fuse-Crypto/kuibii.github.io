import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("production header keeps only the public distribution navigation", () => {
  const source = readFileSync(new URL("../src/components/experience.tsx", import.meta.url), "utf8");
  assert.match(source, /to="\/".*Create value/s);
  assert.match(source, /to="\/games".*Games/s);
  assert.match(source, /to="\/incentives".*Incentives/s);
  assert.match(source, /to="\/how-it-works".*How it works/s);
  assert.match(source, />Kids Mode</);
  assert.match(source, />Pro Mode</);
  assert.match(source, /aria-label="Language"/);
  assert.match(source, /<Switch id="kid-mode"/);
  assert.match(source, /!production &&/);
  assert.match(source, /isProductionHostname/);
});

test("conditional distribution production view hides sections 02 through 07", () => {
  const source = readFileSync(new URL("../src/routes/index.tsx", import.meta.url), "utf8");
  const productionGuard = source.indexOf("{!production && (");

  assert.notEqual(productionGuard, -1);
  assert.ok(source.indexOf('<Section n="00" title={text("Token creation"') < productionGuard);
  assert.ok(source.indexOf('<Section n="01" title={text("Use cases"') < productionGuard);
  assert.match(source, /n="01"[\s\S]*Coming soon/);
  assert.doesNotMatch(source.slice(productionGuard), /n="00"|n="01"/);
  assert.ok(source.indexOf("<Section n=\"02\"", productionGuard) > productionGuard);
  assert.ok(source.indexOf("<Section n=\"07\"", productionGuard) > productionGuard);
});
