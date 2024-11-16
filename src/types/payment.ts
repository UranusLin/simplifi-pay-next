export type PaymentMethod = 'wallet' | 'card' | 'bank'

export interface PaymentDetails {
    id: string
    amount: string
    description: string
    status: 'pending' | 'processing' | 'completed' | 'failed'
    createdAt: string
    from?: string
    to: string
    method?: PaymentMethod
    merchantName?: string
    currency: string
    expiresAt?: string
}