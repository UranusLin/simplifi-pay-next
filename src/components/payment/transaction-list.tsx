'use client'

import { Payment } from "@lib/stores/payment"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/table"
import { Badge } from "@components/ui/badge"
import { formatDistance } from 'date-fns'

interface TransactionListProps {
    transactions: Payment[]
    onSelectTransaction?: (transaction: Payment) => void
}

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
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
                {transactions.map((transaction) => (
                    <TableRow
                        key={transaction.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => onSelectTransaction?.(transaction)}
                    >
                        <TableCell>
                            {formatDistance(new Date(transaction.createdAt), new Date(), { addSuffix: true })}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>${transaction.amount} USDC</TableCell>
                        <TableCell>
                            <Badge variant="secondary" className={statusColors[transaction.status]}>
                                {transaction.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}