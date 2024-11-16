'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useWalletStore } from "@/lib/stores/wallet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePaymentStore } from "@/lib/stores/payment"
import { format } from "date-fns"

export default function HistoryPage() {
    const { payments } = usePaymentStore()
    const { address } = useWalletStore()
    const [filter, setFilter] = useState("all")

    const filteredTransactions = payments.filter(tx => {
        if (filter === "sent") return tx.from === address
        if (filter === "received") return tx.to === address
        return true
    })

    return (
        <div className="container py-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Transaction History</CardTitle>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Transactions</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="received">Received</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTransactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>
                                        {format(new Date(tx.createdAt), "PPp")}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {tx.from === address ? "Sent" : "Received"}
                                    </TableCell>
                                    <TableCell>{tx.description}</TableCell>
                                    <TableCell>${tx.amount} USDC</TableCell>
                                    <TableCell className="font-mono">
                                        {tx.from ? `${tx.from.slice(0, 6)}...${tx.from.slice(-4)}` : '-'}
                                    </TableCell>
                                    <TableCell className="font-mono">
                                        {tx.to ? `${tx.to.slice(0, 6)}...${tx.to.slice(-4)}` : '-'}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            tx.status === "completed" ? "bg-green-100 text-green-800" :
                                                tx.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-red-100 text-red-800"
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}