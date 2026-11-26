import { expect, test } from "bun:test";
import { fuse } from "viem/chains";
import { isSupportedChainId, validateWalletNetwork, WALLET_OPTIONS } from "../src/lib/wallet";

test("Rainbow Wallet is the first supported wallet", () => {
  expect(WALLET_OPTIONS[0]).toEqual({
    id: "rainbow",
    name: "Rainbow Wallet",
  });
});

test("Fuse is the only compatible connected wallet network", () => {
  expect(isSupportedChainId(fuse.id)).toBe(true);
  expect(isSupportedChainId(1)).toBe(false);
  expect(isSupportedChainId(undefined)).toBe(false);
});

test("Wallet network validation reports compatible, unsupported, and unknown states", () => {
  expect(validateWalletNetwork(fuse.id)).toEqual({ compatible: true, status: "compatible" });
  expect(validateWalletNetwork(1)).toEqual({ compatible: false, status: "unsupported" });
  expect(validateWalletNetwork(undefined)).toEqual({ compatible: false, status: "unknown" });
});
