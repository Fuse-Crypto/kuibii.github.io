import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("Rainbow wallet is installed in the root provider and header", () => {
  const walletSource = readFileSync(
    new URL("../src/lib/wallet.ts", import.meta.url),
    "utf8",
  );
  const rootSource = readFileSync(
    new URL("../src/routes/__root.tsx", import.meta.url),
    "utf8",
  );
  const headerSource = readFileSync(
    new URL("../src/components/experience.tsx", import.meta.url),
    "utf8",
  );

  assert.match(walletSource, /rainbowWallet/);
  assert.match(walletSource, /chains:\s*\[fuse\]/);
  assert.match(rootSource, /<WagmiProvider config=\{walletConfig\}>/);
  assert.match(rootSource, /<RainbowKitProvider/);
  assert.match(headerSource, /<ConnectButton\s*\/>/);
});
