'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from '@web3auth/base'
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { AuthAdapter } from "@web3auth/auth-adapter"
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useWalletStore } from "@/lib/stores/wallet"

interface Web3AuthContextType {
    web3auth: Web3AuthNoModal | null
    provider: IProvider | null
    isLoading: boolean
    isAuthenticated: boolean
    login: () => Promise<void>
    logout: () => Promise<void>
    getUserInfo: () => Promise<any>
}

const Web3AuthContext = createContext<Web3AuthContextType>({} as Web3AuthContextType)

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig }
});

export function Web3AuthProvider({ children }: { children: React.ReactNode }) {
    const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null)
    const [provider, setProvider] = useState<IProvider | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const { setWeb3 } = useWalletStore()

    useEffect(() => {
        const init = async () => {
            try {
                const web3authInstance = new Web3AuthNoModal({
                    clientId: 'BIXOoYBPe0Mijn7tZYi0ebhdMk6kO_5O_JXC1NhElzqxS50rkrPFvw5UXP-CIbEguDJsXTf1ts2l9WjHuCA1p00',
                    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
                    privateKeyProvider,
                })

                const adapter = new AuthAdapter()
                web3authInstance.configureAdapter(adapter)

                await web3authInstance.init()
                setWeb3auth(web3authInstance)

                if (web3authInstance.connected) {
                    const provider = web3authInstance.provider
                    setProvider(provider)
                    setWeb3(provider) // 添加這行
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error(error)
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to initialize Web3Auth",
                })
            } finally {
                setIsLoading(false)
            }
        }

        init()
    }, [toast, setWeb3])

    const login = async () => {
        if (!web3auth) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Web3Auth not initialized",
            })
            return
        }

        try {
            setIsLoading(true)
            const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
                loginProvider: "google",
            })

            if (!web3authProvider) {
                throw new Error("Failed to get provider")
            }

            setProvider(web3authProvider)
            setWeb3(web3authProvider) // 確保設置 web3
            setIsAuthenticated(true)

            // 等待 provider 初始化
            await new Promise(resolve => setTimeout(resolve, 2000))

            router.push('/dashboard')

            toast({
                title: "Success",
                description: "Successfully logged in!",
            })
        } catch (error) {
            console.error(error)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to login",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        if (!web3auth) return
        try {
            await web3auth.logout()
            setProvider(null)
            setWeb3(null) // 添加這行確保登出時清除 web3
            setIsAuthenticated(false)
            router.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    const getUserInfo = async () => {
        if (!web3auth) return null
        try {
            const userInfo = await web3auth.getUserInfo()
            return userInfo
        } catch (error) {
            console.error(error)
            return null
        }
    }

    return (
        <Web3AuthContext.Provider
            value={{
                web3auth,
                provider,
                isLoading,
                isAuthenticated,
                login,
                logout,
                getUserInfo,
            }}
        >
            {children}
        </Web3AuthContext.Provider>
    )
}

export const useWeb3Auth = () => useContext(Web3AuthContext)