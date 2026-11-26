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

test("Connected wallet address is retrieved and auto-filled", () => {
  const walletSource = readFileSync(
    new URL("../src/lib/wallet.ts", import.meta.url),
    "utf8",
  );
  const headerSource = readFileSync(
    new URL("../src/components/experience.tsx", import.meta.url),
    "utf8",
  );
  const registerSource = readFileSync(
    new URL("../src/routes/c.$id.register.tsx", import.meta.url),
    "utf8",
  );
  const launchpadSource = readFileSync(
    new URL("../src/routes/launchpad.$id.tsx", import.meta.url),
    "utf8",
  );

  assert.match(walletSource, /formatWalletAddress/);
  assert.match(headerSource, /useAccount/);
  assert.match(headerSource, /Connected wallet/);
  assert.match(headerSource, /formatWalletAddress\(address\)/);
  assert.match(registerSource, /useAccount/);
  assert.match(registerSource, /wallet:\s*address/);
  assert.match(launchpadSource, /useAccount/);
  assert.match(launchpadSource, /wallet:\s*address/);
});
