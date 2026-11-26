# Kuibii

**Live app**: [Kuibi.fun](https://kuibii.fun/)

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

### Wallet connections

Rainbow Wallet uses WalletConnect for supported mobile and browser connections. Set
`VITE_WALLETCONNECT_PROJECT_ID` to a project ID from WalletConnect Cloud before
deploying; a development fallback is included for local builds.
