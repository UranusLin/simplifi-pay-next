"use client";

import { WalletInfo } from "@/components/wallet/wallet-info"
import { SettingsList } from "@/components/profile/settings-list"

export default function ProfilePage() {
    return (
        <div className="space-y-4">
            <WalletInfo />
            <SettingsList />
        </div>
    )
}
