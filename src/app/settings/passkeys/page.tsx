'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useWeb3Auth } from "@/providers/web3auth-provider"

export default function PasskeysPage() {
    const { isAuthenticated } = useWeb3Auth()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadPasskeys()
    }, [])

    const loadPasskeys = async () => {
        if (!isAuthenticated) return
        try {
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Manage Passkeys</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Button
                            disabled={isLoading}
                        >
                            <Icons.fingerprint className="mr-2 h-4 w-4" />
                            Register New Passkey
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}