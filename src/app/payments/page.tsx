'use client'

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { TransactionList } from "@components/payment/transaction-list"
import { QRScanner } from "@components/payment/qr-scanner"
import { usePaymentStore } from "@/lib/stores/payment"
import { useToast } from "@/hooks/use-toast"

export default function PaymentsPage() {
    const router = useRouter()
    const { payments } = usePaymentStore()
    const { toast } = useToast()

    const handleScanQR = (data: string) => {
        try {
            const paymentData = JSON.parse(data)
            router.push(`/payment/${paymentData.id}`)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Invalid QR Code",
                description: "The scanned QR code is not a valid payment code.",
            })
        }
    }

    const handleSelectTransaction = (transaction: any) => {
        router.push(`/payment/${transaction.id}`)
    }

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Payments</h1>
                <div className="flex gap-4">
                    <QRScanner onScan={handleScanQR} />
                    <Button onClick={() => router.push('/payment/create')}>
                        <Icons.payment className="mr-2 h-4 w-4" />
                        New Payment
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TransactionList
                            transactions={payments}
                            onSelectTransaction={handleSelectTransaction}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}