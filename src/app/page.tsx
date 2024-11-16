import { DashboardStats } from "@/components/dashboard/stats"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

export default function HomePage() {
  return (
      <div className="space-y-4">
        <DashboardStats />
        <QuickActions />
        <RecentTransactions />
      </div>
  )
}