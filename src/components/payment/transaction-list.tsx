'use client'

import {Payment, usePaymentStore} from "@/lib/stores/payment"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface TransactionListProps {
    transactions: Payment[]
    onSelectTransaction: (transaction: Payment) => void
}

export function TransactionList({ transactions, onSelectTransaction }: TransactionListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((tx) => (
                    <TableRow key={tx.id} onClick={() => onSelectTransaction(tx)}>
                        <TableCell>{tx.createdAt}</TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell>${tx.amount}</TableCell>
                        <TableCell>
                            <Badge variant="secondary">
                                {tx.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
