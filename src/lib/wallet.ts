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

export type WalletErrorKind =
  | "rejected"
  | "network_mismatch"
  | "connection"
  | "unknown";

export function getWalletErrorKind(error: unknown): WalletErrorKind {
  const parts: unknown[] = [error];
  if (error && typeof error === "object") {
    const candidate = error as {
      code?: unknown;
      name?: unknown;
      message?: unknown;
      cause?: unknown;
    };
    parts.push(candidate.code, candidate.name, candidate.message, candidate.cause);
  }
  const text = parts
    .filter((part) => typeof part === "string" || typeof part === "number")
    .map(String)
    .join(" ")
    .toLowerCase();

  if (
    text.includes("4001") ||
    text.includes("action_rejected") ||
    text.includes("user rejected") ||
    text.includes("user_rejected") ||
    text.includes("request rejected") ||
    text.includes("cancelled") ||
    text.includes("canceled")
  ) {
    return "rejected";
  }
  if (
    text.includes("4900") ||
    text.includes("4770") ||
    text.includes("chain mismatch") ||
    text.includes("network mismatch") ||
    text.includes("different network") ||
    text.includes("unsupported chain") ||
    text.includes("switch chain")
  ) {
    return "network_mismatch";
  }
  if (
    text.includes("4100") ||
    text.includes("4200") ||
    text.includes("-32002") ||
    text.includes("provider") ||
    text.includes("disconnected") ||
    text.includes("wallet not found") ||
    text.includes("wallet extension") ||
    text.includes("locked")
  ) {
    return "connection";
  }
  return "unknown";
}

export function getWalletErrorMessage(
  error: unknown,
  action: "connect" | "disconnect" | "switch" = "connect",
) {
  switch (getWalletErrorKind(error)) {
    case "rejected":
      return "Wallet request rejected. Nothing changed.";
    case "network_mismatch":
      return "Your wallet is on a different network. Switch to Fuse and try again.";
    case "connection":
      return "Wallet could not connect. Check that the wallet is installed, unlocked, and available.";
    case "unknown":
      if (action === "switch") {
        return "Could not switch networks. Check your wallet and try again.";
      }
      if (action === "disconnect") {
        return "Could not disconnect the wallet. Try again.";
      }
      return "Could not connect to the wallet. Try again.";
  }
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
