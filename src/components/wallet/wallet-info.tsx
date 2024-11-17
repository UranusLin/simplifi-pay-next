'use client'

import { useEffect, useState } from 'react'
import { useWalletStore } from '@/lib/stores/wallet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useToast } from '@/hooks/use-toast'
import { MiniKit, ResponseEvent, type MiniAppWalletAuthSuccessPayload } from '@worldcoin/minikit-js'

export function WalletInfo() {
    const { balance, isLoading, updateBalance } = useWalletStore()
    const { toast } = useToast()
    const [address, setAddress] = useState<string | null>(null)

    useEffect(() => {
        const initWallet = async () => {
            if (!MiniKit.isInstalled()) return

            // 驗證錢包
            try {
                const res = await fetch('/api/nonce')
                const { nonce } = await res.json()

                const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
                    nonce: nonce,
                    requestId: '0',
                    expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
                    notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                    statement: 'Connect to SimpliFi Pay',
                })

                if (finalPayload.status === 'success') {
                    const response = await fetch('/api/complete-siwe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            payload: finalPayload,
                            nonce,
                        }),
                    })

                    const result = await response.json()
                    if (result.isValid) {
                        setAddress(MiniKit.walletAddress)
                        await updateBalanceWithWorldChain()
                    }
                }
            } catch (error) {
                console.error('Wallet auth error:', error)
            }
        }

        initWallet()
    }, [])

    const updateBalanceWithWorldChain = async () => {
        if (!MiniKit.isInstalled() || !MiniKit.walletAddress) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Wallet not connected",
            })
            return
        }

        try {
            const initRes = await fetch('/api/initiate-pay', {
                method: 'POST'
            })
            const { id } = await initRes.json()

            const payload = {
                reference: id,
                to: MiniKit.walletAddress,
                // 獲取餘額不需要真的發送交易，我們只需要獲取餘額資訊
                tokens: [
                    {
                        symbol: 'WLD',
                        token_amount: '0'
                    }
                ],
                description: 'Check balance'
            }

            const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

            if (finalPayload.token_balances) {
                const wldBalance = finalPayload.token_balances.find(b => b.symbol === 'WLD')
                if (wldBalance) {
                    updateBalance(wldBalance.balance)
                    toast({
                        title: "Balance Updated",
                        description: "Your wallet balance has been refreshed",
                    })
                }
            }
        } catch (error) {
            console.error('Error fetching balance:', error)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch balance. Please try again.",
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Wallet Information</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-mono text-sm">
                            {isLoading ? (
                                <Icons.spinner className="h-4 w-4 animate-spin" />
                            ) : (
                                address ?
                                    `${address.slice(0, 6)}...${address.slice(-4)}` :
                                    'Not connected'
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Balance</p>
                        <p className="font-mono text-sm">
                            {isLoading ? (
                                <Icons.spinner className="h-4 w-4 animate-spin" />
                            ) : (
                                balance ? `${balance} WLD` : '0 WLD'
                            )}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={updateBalanceWithWorldChain}
                        disabled={isLoading || !address}
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