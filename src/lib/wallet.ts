import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { http } from "viem";
import { fuse } from "viem/chains";

export const WALLET_OPTIONS = [
  { id: "rainbow", name: "Rainbow Wallet" },
] as const;

const walletConnectProjectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ||
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
