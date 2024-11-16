import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"

export const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7", // Sepolia testnet
    rpcTarget: process.env.NEXT_PUBLIC_RPC_URL!,
    displayName: "Ethereum Sepolia",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig }
})

export const web3AuthConfig = {
    clientId: 'BFDrsp8UlXVGE6X_N4_05Hx_HW_2uPVCDemuThyohuDPflvp6w3onBPRKg-2fNZRe_HedAh50BwBqeYOp9GrgbE',
    chainConfig,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
}