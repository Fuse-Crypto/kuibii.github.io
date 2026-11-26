import { expect, test } from "bun:test";
import { fuse } from "viem/chains";
import {
  getWalletErrorKind,
  getWalletErrorMessage,
  isSupportedChainId,
  validateWalletNetwork,
  WALLET_OPTIONS,
} from "../src/lib/wallet";

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

test("Wallet errors are classified and turned into actionable messages", () => {
  expect(getWalletErrorKind({ code: 4001, message: "User rejected the request" })).toBe("rejected");
  expect(getWalletErrorKind({ code: 4900, message: "Chain mismatch" })).toBe("network_mismatch");
  expect(getWalletErrorKind({ code: -32002, message: "Wallet provider is locked" })).toBe("connection");

  expect(getWalletErrorMessage({ code: 4001 })).toContain("Nothing changed");
  expect(getWalletErrorMessage({ code: 4900 })).toContain("Switch to Fuse");
  expect(getWalletErrorMessage({ code: -32002 })).toContain("installed");
  expect(getWalletErrorMessage(new Error("unknown"), "switch")).toContain("Could not switch networks");
});
