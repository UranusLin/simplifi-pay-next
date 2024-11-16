'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import QRCode from "react-qr-code"
import { usePaymentStore } from "@/lib/stores/payment"

const formSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    description: z.string().min(1, "Description is required"),
})

export default function CreatePaymentPage() {
    const router = useRouter()
    const { toast } = useToast()
    const { addPayment } = usePaymentStore()
    const [showQR, setShowQR] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [paymentData, setPaymentData] = useState<any>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            description: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true)
            const payment = {
                id: `payment_${Date.now()}`,
                amount: values.amount,
                description: values.description,
                status: 'pending' as const,
                createdAt: new Date().toISOString(),
            }

            addPayment(payment)
            setPaymentData(payment)
            setShowQR(true)

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an error creating the payment.",
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount (USDC)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0.00"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Generating..." : "Generate QR Code"}
                                </Button>
                            </div>
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
                        <Button onClick={handleConfirmQR}>Done</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}