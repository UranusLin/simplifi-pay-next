'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentMethod } from "@/types/payment"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

interface PaymentMethodsProps {
    onSelect: (method: PaymentMethod) => void
    selectedMethod?: PaymentMethod
}

const methods = [
    {
        id: 'wallet',
        name: 'Crypto Wallet',
        icon: Icons.wallet,
        description: 'Pay with your crypto wallet',
    },
    {
        id: 'card',
        name: 'Credit Card',
        icon: Icons.card,
        description: 'Pay with credit/debit card',
    },
    {
        id: 'bank',
        name: 'Bank Transfer',
        icon: Icons.bank,
        description: 'Pay via bank transfer',
    },
]

export function PaymentMethods({ onSelect, selectedMethod }: PaymentMethodsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {methods.map((method) => (
                <Card
                    key={method.id}
                    className={cn(
                        "cursor-pointer transition-colors hover:bg-accent",
                        selectedMethod === method.id && "border-primary"
                    )}
                    onClick={() => onSelect(method.id as PaymentMethod)}
                >
                    <CardHeader>
                        <div className="flex items-center space-x-2">
                            <method.icon className="h-5 w-5" />
                            <CardTitle className="text-base">{method.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {method.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}