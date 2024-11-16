'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const networks = [
    { id: "0xaa36a7", name: "Sepolia", rpc: "https://rpc.ankr.com/eth_sepolia" },
    { id: "0x1", name: "Ethereum", rpc: "https://eth-mainnet.alchemyapi.io/v2/your-api-key" },
    { id: "0x5", name: "Goerli", rpc: "https://goerli.infura.io/v3/your-api-key" },
]

export function NetworkSelector() {
    const [selectedNetwork, setSelectedNetwork] = useState("0xaa36a7")
    const { toast } = useToast()

    const handleNetworkChange = async (networkId: string) => {
        try {
            // @ts-expect-error
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: networkId }],
            })
            setSelectedNetwork(networkId)
        } catch (error: any) {
            if (error.code === 4902) {
                const network = networks.find(n => n.id === networkId)
                if (!network) return

                // @ts-expect-error
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: networkId,
                        rpcUrls: [network.rpc],
                        chainName: network.name,
                        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                    }],
                })
                setSelectedNetwork(networkId)
            }
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to switch network",
            })
        }
    }

    return (
        <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
                {networks.map((network) => (
                    <SelectItem key={network.id} value={network.id}>
                        {network.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}