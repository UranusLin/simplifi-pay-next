'use client'
import { DashboardStats } from "@/components/dashboard/stats"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <DashboardStats />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <RecentTransactions className="col-span-4" />
                <QuickActions className="col-span-3" />
            </div>
        </div>
    )
}