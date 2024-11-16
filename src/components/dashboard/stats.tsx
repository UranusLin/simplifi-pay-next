'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Icons } from "@components/icons"

const stats = [
    {
        title: "Total Balance",
        value: "$12,345",
        icon: Icons.wallet,
    },
    {
        title: "Monthly Spending",
        value: "$2,345",
        icon: Icons.spending,
    },
    {
        title: "Total Transactions",
        value: "145",
        icon: Icons.transaction,
    },
    {
        title: "Active Merchants",
        value: "12",
        icon: Icons.store,
    },
]

export function DashboardStats() {
    return (
        <div className="grid grid-cols-2 gap-4">
            {/* 改為2列而不是4列以適應移動端 */}
            {stats.map((stat) => (
                <Card key={stat.title} className="p-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}