'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, WEB3AUTH_NETWORK, type IProvider } from '@web3auth/base'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { AuthAdapter } from '@web3auth/auth-adapter'

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '7887', // Kinto
    rpcTarget: process.env.NEXT_PUBLIC_RPC_URL || 'https://kinto-rpc.com',
    displayName: 'Kinto Network',
    blockExplorerUrl: 'https://explorer.kinto.xyz',
    ticker: 'ETH',
    tickerName: 'Ethereum',
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig }
})

interface AuthContextType {
    web3auth: Web3AuthNoModal | null
    provider: IProvider | null
    isLoading: boolean
    isAuthenticated: boolean
    login: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null)
    const [provider, setProvider] = useState<IProvider | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const init = async () => {
            try {
                const web3auth = new Web3AuthNoModal({
                    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
                    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
                    privateKeyProvider,
                })

                const authAdapter = new AuthAdapter()
                web3auth.configureAdapter(authAdapter)

                await web3auth.init()
                setWeb3auth(web3auth)

                if (web3auth.connected) {
                    setProvider(web3auth.provider)
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        init()
    }, [])

    const login = async () => {
        if (!web3auth) return
        try {
            const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
                loginProvider: 'google',
            })
            setProvider(web3authProvider)
            setIsAuthenticated(true)
        } catch (error) {
            console.error(error)
        }
    }

    const logout = async () => {
        if (!web3auth) return
        await web3auth.logout()
        setProvider(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider
            value={{
                web3auth,
                provider,
                isLoading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)