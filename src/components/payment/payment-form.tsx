'use client'

import {
    MiniAppPaymentPayload,
    MiniKit,
    PayCommandInput,
    ResponseEvent,
    Tokens,
    tokenToDecimals
} from '@worldcoin/minikit-js'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function PaymentForm() {
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePayment = async () => {
        try {
            // 取得交易參考 ID
            const res = await fetch('/api/initiate-payment', {
                method: 'POST'
            });
            const { id } = await res.json();

            // 建立支付請求
            const payload: PayCommandInput = {
                reference: id,
                to: "接收方地址",
                tokens: [
                    {
                        symbol: Tokens.USDCE,
                        token_amount: tokenToDecimals(Number(amount), Tokens.USDCE).toString()
                    }
                ],
                description: "Payment description"
            };

            if (MiniKit.isInstalled()) {
                setLoading(true)
                await MiniKit.commands.pay(payload);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // 監聽支付響應
    useEffect(() => {
        if (!MiniKit.isInstalled()) return;

        MiniKit.subscribe(
            ResponseEvent.MiniAppPayment,
            async (response: MiniAppPaymentPayload) => {
                if (response.status === "success") {
                    const res = await fetch('/api/confirm-payment', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response),
                    });
                    const payment = await res.json();
                    if (payment.success) {
                        // 支付成功處理
                    }
                }
            }
        );

        return () => {
            MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
        };
    }, []);

    return (
        <div className="space-y-4">
            <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="輸入金額"
            />
            <Button
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Pay'}
            </Button>
        </div>
    )
}