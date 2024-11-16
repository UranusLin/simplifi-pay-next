import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Payment {
    id: string
    amount: string
    description: string
    status: 'pending' | 'processing' | 'completed' | 'failed'
    createdAt: string
    from?: string
    to?: string
}

interface PaymentStore {
    payments: Payment[]
    addPayment: (payment: Payment) => void
    updatePayment: (id: string, data: Partial<Payment>) => void
    getPayment: (id: string) => Payment | undefined
    clearPayments: () => void
}

export const usePaymentStore = create<PaymentStore>()(
    persist(
        (set, get) => ({
            payments: [],
            addPayment: (payment) => set((state) => ({
                payments: [payment, ...state.payments]
            })),
            updatePayment: (id, data) => set((state) => ({
                payments: state.payments.map((payment) =>
                    payment.id === id ? { ...payment, ...data } : payment
                ),
            })),
            getPayment: (id) => get().payments.find((payment) => payment.id === id),
            clearPayments: () => set({ payments: [] }),
        }),
        {
            name: 'payment-storage',
        }
    )
)