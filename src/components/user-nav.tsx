'use client'

import { useWeb3Auth } from "@/providers/web3auth-provider"
import { useWalletStore } from "@/lib/stores/wallet"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { WalletAvatar } from "@components/wallet/wallet-avatar"
import { useEffect } from "react"

export function UserNav() {
    const { logout, getUserInfo } = useWeb3Auth()
    const { address, balance, isLoading } = useWalletStore()

    const shortenAddress = (addr: string) => {
        if (!addr) return ''
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                alert("Address copied to clipboard!")
            },
            (err) => {
                console.error("Could not copy text: ", err)
            }
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0"
                >
                    <div className="relative h-full w-full">
                        <WalletAvatar size={40} />
                        {isLoading && (
                            <div className="absolute -top-1 -right-1">
                                <Icons.spinner className="h-4 w-4 animate-spin" />
                            </div>
                        )}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm font-medium leading-none">Wallet</p>
                        <div className="flex items-center space-x-2">
                            <p className="text-xs font-mono truncate">
                                {address ? shortenAddress(address) : 'Not connected'}
                            </p>
                            {address && (
                                <button onClick={() => copyToClipboard(address)}>
                                    <Icons.copy className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                                </button>
                            )}
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Balance:</span>
                            <span>{balance ? `${Number(balance).toFixed(4)} ETH` : '0 ETH'}</span>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => getUserInfo()}
                    className="cursor-pointer"
                >
                    <Icons.user className="mr-2 h-4 w-4" />
                    <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer text-red-600"
                >
                    <Icons.logout className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
