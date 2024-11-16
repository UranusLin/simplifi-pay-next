'use client'

import { PaymentMethods } from "@/components/payment/payment-methods"
import { QRScanner } from "@/components/payment/qr-scanner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function PayPage() {
    const router = useRouter()

    const handleScan = (data: string) => {
        try {
            const paymentData = JSON.parse(data)
            router.push(`/payment/${paymentData.id}`)
        } catch (error) {
            console.error('Invalid QR code:', error)
        }
    }

    return (
        <div className="space-y-4">
            <Card className="p-4">
                <QRScanner onScan={handleScan} />
            </Card>

            <PaymentMethods />

            <div className="grid grid-cols-2 gap-4">
                <Button size="lg" variant="outline">Send</Button>
                <Button size="lg">Request</Button>
            </div>
        </div>
    )
}