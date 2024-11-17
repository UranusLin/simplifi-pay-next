'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import QRCode from "react-qr-code"
import { usePaymentStore } from "@/lib/stores/payment"
import { MiniKit } from "@worldcoin/minikit-js"

const formSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    description: z.string().min(1, "Description is required"),
    recipient: z.string().optional(),
})

export default function CreatePaymentPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { toast } = useToast()
    const { addPayment } = usePaymentStore()
    const [showQR, setShowQR] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [paymentData, setPaymentData] = useState<any>(null)

    const method = searchParams.get('method') || 'direct'

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            description: "",
            recipient: "",
        },
    })

    const handleCreatePayment = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsSubmitting(true)
            const initRes = await fetch('/api/initiate-pay', {
                method: 'POST'
            })
            const { id } = await initRes.json()

            if (!MiniKit.isInstalled()) {
                throw new Error('MiniKit not installed')
            }

            const payment = {
                id,
                amount: values.amount,
                description: values.description,
                recipient: values.recipient,
                status: 'pending' as const,
                method,
                createdAt: new Date().toISOString(),
            }

            const payload = {
                reference: id,
                to: values.recipient || '',
                tokens: [
                    {
                        symbol: 'USDCE',
                        token_amount: (parseFloat(values.amount) * 1e6).toString() // 6 decimals for USDC
                    }
                ],
                description: values.description
            }

            if (method === 'wallet') {
                try {
                    const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

                    if (finalPayload.status === 'success') {
                        // 驗證支付
                        const verifyRes = await fetch('/api/confirm-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                payload: finalPayload
                            })
                        })

                        const result = await verifyRes.json()
                        if (result.success) {
                            payment.status = 'completed'
                            addPayment(payment)
                            toast({
                                title: "Payment Successful",
                                description: "Payment has been processed successfully.",
                            })
                            router.push('/payments')
                            return
                        }
                    }
                } catch (error) {
                    console.error('World Wallet payment error:', error)
                    toast({
                        variant: "destructive",
                        title: "Payment Failed",
                        description: "There was an error processing your World Wallet payment.",
                    })
                    return
                }
            }

            // 如果是直接轉帳或 World Wallet 失敗，生成 QR 碼
            addPayment(payment)
            setPaymentData(payment)
            setShowQR(true)

        } catch (error) {
            console.error('Payment creation error:', error)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create payment. Please try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleConfirmQR = () => {
        toast({
            title: "Payment Created",
            description: "QR code has been generated successfully.",
        })
        router.push('/payments')
    }

    return (
        <div className="container py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreatePayment)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount (USDC)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {method === 'direct' && (
                                <FormField
                                    control={form.control}
                                    name="recipient"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Recipient Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="0x..."
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Payment for..."
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting ? "Processing..." : method === 'wallet' ? "Pay with World Wallet" : "Generate Payment"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Dialog open={showQR} onOpenChange={setShowQR}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Payment QR Code</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-4">
                        {paymentData && (
                            <>
                                <QRCode value={JSON.stringify(paymentData)} size={256} />
                                <div className="text-center">
                                    <p className="font-medium">Amount: ${paymentData.amount} USDC</p>
                                    <p className="text-sm text-muted-foreground">{paymentData.description}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => {
                            setShowQR(false)
                            router.push('/payments')
                        }}>Done</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}