'use client'

import { TransactionList } from "@/components/payment/transaction-list"

export default function HistoryPage() {
    return (
        <div className="space-y-4">
            <TransactionList />
        </div>
    )
}