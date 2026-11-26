import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { http } from "viem";
import { fuse } from "viem/chains";

export const WALLET_OPTIONS = [
  { id: "rainbow", name: "Rainbow Wallet" },
] as const;

export function formatWalletAddress(address: string) {
  return address.length > 12
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : address;
}

const walletConnectProjectId =
  import.meta.env["VITE_WALLETCONNECT_PROJECT_ID"] ||
  "21fef48091f12692cad574a6f7753643";

export const walletConfig = getDefaultConfig({
  appName: "Kuibii",
  appDescription: "Token distributions and smart transactions",
  projectId: walletConnectProjectId,
  chains: [fuse],
  transports: {
    [fuse.id]: http(),
  },
  wallets: [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet],
    },
  ],
  ssr: true,
});
