import { create } from 'zustand'
import { Web3RPC } from '@/lib/web3-utils'
import { ethers } from 'ethers'

interface WalletState {
    address: string | null
    balance: string | null
    isLoading: boolean
    error: string | null
    web3: Web3RPC | null
    setWeb3: (provider: any) => void
    setAddress: (address: string) => void
    setBalance: (balance: string) => void
    updateBalance: () => Promise<void>
    disconnect: () => void
}

export const useWalletStore = create<WalletState>((set, get) => ({
    address: null,
    balance: null,
    isLoading: false,
    error: null,
    web3: null,

    setWeb3: async (provider) => {
        if (!provider) {
            set({ web3: null, address: null, balance: null })
            return
        }

        try {
            // 等待provider初始化
            await new Promise(resolve => setTimeout(resolve, 2000))

            // 驗證provider
            const ethersProvider = new ethers.BrowserProvider(provider as any)
            const signer = await ethersProvider.getSigner()
            const address = await signer.getAddress()

            console.log("Provider initialized with address:", address)

            const web3 = new Web3RPC(provider)
            set({ web3, address })

            // 更新餘額
            get().updateBalance()
        } catch (error) {
            console.error("Error initializing Web3:", error)
            set({ error: "Failed to initialize wallet" })
        }
    },

    setAddress: (address) => set({ address }),
    setBalance: (balance) => set({ balance }),

    updateBalance: async () => {
        const { web3, address } = get()
        if (!web3 || !address) return

        try {
            set({ isLoading: true, error: null })
            const balance = await web3.getBalance()
            set({ balance })
        } catch (error) {
            console.error("Error updating balance:", error)
            set({ error: error instanceof Error ? error.message : "Failed to get balance" })
        } finally {
            set({ isLoading: false })
        }
    },

    disconnect: () => {
        set({
            address: null,
            balance: null,
            web3: null,
            error: null
        })
    },
}))