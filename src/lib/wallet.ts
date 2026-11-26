import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { http } from "viem";
import { fuse } from "viem/chains";

export const WALLET_OPTIONS = [
  { id: "rainbow", name: "Rainbow Wallet" },
] as const;

export const SUPPORTED_CHAINS = [fuse] as const;

export function isSupportedChainId(chainId: number | undefined) {
  return typeof chainId === "number" && SUPPORTED_CHAINS.some((chain) => chain.id === chainId);
}

export function validateWalletNetwork(chainId: number | undefined) {
  if (typeof chainId !== "number") {
    return { compatible: false, status: "unknown" as const };
  }
  if (isSupportedChainId(chainId)) {
    return { compatible: true, status: "compatible" as const };
  }
  return { compatible: false, status: "unsupported" as const };
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
