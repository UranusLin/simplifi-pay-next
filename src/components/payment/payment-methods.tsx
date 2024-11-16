'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import type { PaymentMethod } from "@/types/payment"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const methods = [
    {
        id: 'wallet',
        name: 'World Wallet',
        icon: Icons.wallet,
        description: 'Pay with your World ID wallet',
    },
    {
        id: 'direct',
        name: 'Direct Transfer',
        icon: Icons.send,
        description: 'Send directly to recipient',
    }
] as const

export function PaymentMethods() {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>()
    const router = useRouter()

    const handleSelect = (method: PaymentMethod) => {
        setSelectedMethod(method)
        if (method === 'wallet') {
            // 使用 World Wallet
            router.push('/payment/create?method=wallet')
        } else if (method === 'bank') {
            // 直接轉帳
            router.push('/payment/create?method=direct')
        }
    }

    return (
        <div className="grid gap-4">
            {methods.map((method) => (
                <Card
                    key={method.id}
                    className={cn(
                        "cursor-pointer hover:bg-accent",
                        selectedMethod === method.id && "border-primary"
                    )}
                    onClick={() => handleSelect(method.id as PaymentMethod)}
                >
                    <CardContent className="p-4 flex items-center gap-4">
                        <method.icon className="h-8 w-8" />
                        <div>
                            <h3 className="font-medium">{method.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {method.description}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}