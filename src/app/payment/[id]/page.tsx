'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useToast } from "@/hooks/use-toast"
import { usePaymentStore } from "@/lib/stores/payment"
import { PaymentStatus } from "@/components/payment/payment-status"
import { ConfirmationDialog } from "@/components/payment/confirmation-dialog"
import { formatDistance } from "date-fns"

export default function PaymentConfirmPage({
                                               params,
                                           }: {
    params: any
}) {
    const paymentId = params?.id;
    const router = useRouter()
    const { toast } = useToast()
    const { getPayment, updatePayment } = usePaymentStore()
    const [isProcessing, setIsProcessing] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [showCancelDialog, setShowCancelDialog] = useState(false)

    const payment = getPayment(paymentId);

    const handleConfirmPayment = async () => {
        try {
            setIsProcessing(true)
            setShowConfirmDialog(false)
            updatePayment(params.id, { status: 'processing' })
            await new Promise(resolve => setTimeout(resolve, 2000))
            updatePayment(params.id, { status: 'completed' })

            toast({
                title: "Payment Successful",
                description: "Your payment has been processed successfully.",
            })

            setTimeout(() => {
                router.push("/payments")
            }, 1500)

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            updatePayment(params.id, { status: 'failed' })
            toast({
                variant: "destructive",
                title: "Payment Failed",
                description: "There was an error processing your payment.",
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleCancel = () => {
        setShowCancelDialog(false)
        updatePayment(params.id, { status: 'failed' })
        router.push("/payments")
    }

    if (!payment) {
        return null
    }

    return (
        <div className="container py-8">
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="gap-2"
                >
                    <Icons.arrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Payment Details</CardTitle>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.back()}
                        >
                            Back to List
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <PaymentStatus
                        status={payment.status}
                        onComplete={() => console.log("Payment completed")}
                    />

                    <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                        <div>
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="text-lg font-medium">${payment.amount} USDC</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Created</p>
                            <p className="text-lg font-medium">
                                {formatDistance(new Date(payment.createdAt), new Date(), { addSuffix: true })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Description</p>
                            <p className="text-lg font-medium">{payment.description}</p>
                        </div>
                        {payment.to && (
                            <div>
                                <p className="text-sm text-muted-foreground">To</p>
                                <p className="text-lg font-medium font-mono">{payment.to}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => setShowCancelDialog(true)}
                        disabled={isProcessing || payment.status !== 'pending'}
                    >
                        Cancel Payment
                    </Button>
                    <Button
                        onClick={() => setShowConfirmDialog(true)}
                        disabled={isProcessing || payment.status !== 'pending'}
                    >
                        {isProcessing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Payment
                    </Button>
                </CardFooter>
            </Card>

            <ConfirmationDialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
                title="Confirm Payment"
                description="Are you sure you want to proceed with this payment? This action cannot be undone."
                actionLabel="Confirm"
                onConfirm={handleConfirmPayment}
                onCancel={() => setShowConfirmDialog(false)}
            />

            <ConfirmationDialog
                open={showCancelDialog}
                onOpenChange={setShowCancelDialog}
                title="Cancel Payment"
                description="Are you sure you want to cancel this payment? This action cannot be undone."
                actionLabel="Cancel Payment"
                onConfirm={handleCancel}
                onCancel={() => setShowCancelDialog(false)}
            />
        </div>
    )
}