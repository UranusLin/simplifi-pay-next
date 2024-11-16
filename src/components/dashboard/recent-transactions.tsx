'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/table"
import { cn } from "@lib/utils"

interface Transaction {
    id: string
    date: string
    description: string
    amount: number
    status: "completed" | "pending" | "failed"
}

const transactions: Transaction[] = [
    {
        id: "1",
        date: "2024-02-15",
        description: "Coffee Shop",
        amount: 5.99,
        status: "completed",
    },
    {
        id: "2",
        date: "2024-02-15",
        description: "Restaurant",
        amount: 45.50,
        status: "completed",
    },
    {
        id: "3",
        date: "2024-02-14",
        description: "Grocery Store",
        amount: 125.30,
        status: "pending",
    },
]

interface RecentTransactionsProps {
    className?: string
}

export function RecentTransactions({ className }: RecentTransactionsProps) {
    return (
        <Card className={cn("col-span-4", className)}>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
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
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                <TableCell>
                  <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      {
                          "bg-green-100 text-green-800": transaction.status === "completed",
                          "bg-yellow-100 text-yellow-800": transaction.status === "pending",
                          "bg-red-100 text-red-800": transaction.status === "failed",
                      }
                  )}>
                    {transaction.status}
                  </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}