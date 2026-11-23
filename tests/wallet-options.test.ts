import { expect, test } from "bun:test";
import { WALLET_OPTIONS } from "../src/lib/wallet";

test("Rainbow Wallet is the first supported wallet", () => {
  expect(WALLET_OPTIONS[0]).toEqual({
    id: "rainbow",
    name: "Rainbow Wallet",
  });
});
