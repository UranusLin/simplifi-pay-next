// src/components/wallet/wallet-info.tsx
'use client'

import { useEffect } from 'react'
import { useWalletStore } from '@/lib/stores/wallet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useToast } from '@/hooks/use-toast'
import { WalletAvatar } from '@/components/wallet/wallet-avatar'

export function WalletInfo() {
    const { address, balance, isLoading, updateBalance } = useWalletStore()
    const { toast } = useToast()

    useEffect(() => {
        if (!balance) {
            updateBalance()
        }
    }, [balance, updateBalance])

    const copyAddress = async () => {
        if (address) {
            await navigator.clipboard.writeText(address)
            toast({
                title: "Address Copied",
                description: "Wallet address has been copied to clipboard",
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <WalletAvatar size={40} />
                    <CardTitle>Wallet Information</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <p className="font-mono text-sm">
                                {isLoading ? (
                                    <Icons.spinner className="h-4 w-4 animate-spin" />
                                ) : (
                                    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'
                                )}
                            </p>
                        </div>
                        {address && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={copyAddress}
                            >
                                <Icons.copy className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Balance</p>
                        <p className="font-mono text-sm">
                            {isLoading ? (
                                <Icons.spinner className="h-4 w-4 animate-spin" />
                            ) : (
                                balance ? `${balance} ETH` : '0 ETH'
                            )}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateBalance()}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Icons.refresh className="mr-2 h-4 w-4" />
                        )}
                        Refresh
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}