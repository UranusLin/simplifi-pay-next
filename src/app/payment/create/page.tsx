'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    MiniKit,
    Tokens,
    PayCommandInput,
    ResponseEvent,
    MiniAppPaymentPayload,
    tokenToDecimals
} from '@worldcoin/minikit-js';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// 定義支付狀態類型
type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';

interface Payment {
    id: string;
    amount: string;
    description: string;
    recipient?: string;
    status: PaymentStatus;
    method: string;
    createdAt: string;
    to?: string;
}

// 定義表單驗證
const formSchema = z.object({
    amount: z.string(),
    description: z.string(),
    recipient: z.string().optional(),
});

// 狀態和函數
const [isSubmitting, setIsSubmitting] = useState(false);
const [method, setMethod] = useState<'wallet' | 'transfer'>('wallet');
const [payments, setPayments] = useState<Payment[]>([]);
const [paymentData, setPaymentData] = useState<Payment | null>(null); // 定義 setPaymentData
const [showQR, setShowQR] = useState(false);
const { toast } = useToast();
const router = useRouter();

const addPayment = (newPayment: Payment) => {
    setPayments((prevPayments) => [...prevPayments, newPayment]);
};

// 修改支付函數
async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setIsSubmitting(true);

        const paymentId = `payment_${Date.now()}`;
        const payment: Payment = {
            id: paymentId,
            amount: values.amount,
            description: values.description,
            recipient: values.recipient,
            status: 'pending',
            method,
            createdAt: new Date().toISOString(),
        };

        if (method === 'wallet' && MiniKit.isInstalled()) {
            try {
                const res = await fetch('/api/initiate-payment', {
                    method: 'POST',
                });
                const { id } = await res.json();

                const payCommandInput: PayCommandInput = {
                    reference: id,
                    to: values.recipient || '',
                    tokens: [
                        {
                            symbol: Tokens.USDCE,
                            token_amount: tokenToDecimals(parseFloat(values.amount), Tokens.USDCE).toString(),
                        },
                    ],
                    description: values.description,
                };

                MiniKit.commands.pay(payCommandInput);
            } catch (error) {
                console.error('World Wallet payment error:', error);
                toast({
                    variant: 'destructive',
                    title: 'Payment Failed',
                    description: 'There was an error processing your World Wallet payment.',
                });
                return;
            }
        }

        // 如果使用 QR 碼支付
        addPayment(payment);
        setPaymentData(payment);
        setShowQR(true);
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'There was an error creating the payment.',
        });
    } finally {
        setIsSubmitting(false);
    }
}

// useEffect 監聽支付回應
useEffect(() => {
    if (!MiniKit.isInstalled()) {
        return;
    }

    MiniKit.subscribe(ResponseEvent.MiniAppPayment, async (response: MiniAppPaymentPayload) => {
        // 直接訪問 response 的 status 屬性
        if (response.status === 'success') {
            // 調用後端 API 以確認支付
            const res = await fetch('/api/confirm-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(response),
            });
            const payment = await res.json();
            if (payment.success) {
                console.log('Payment confirmed!');
            }
        } else {
            console.error('Payment failed:', response);
        }
    });

    return () => {
        MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
    };
}, []);
