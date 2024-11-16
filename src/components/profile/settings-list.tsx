'use client'

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useWeb3Auth } from "@/providers/web3auth-provider"

const settings = [
    {
        title: "Security",
        description: "Configure security settings",
        icon: Icons.security,
        href: "/settings/security"
    },
    {
        title: "Notifications",
        description: "Manage notification preferences",
        icon: Icons.notification,
        href: "/settings/notifications"
    },
    {
        title: "World ID",
        description: "Manage your World ID verification",
        icon: Icons.check,
        href: "/settings/world-id"
    }
]

export function SettingsList() {
    const { logout } = useWeb3Auth()

    return (
        <div className="space-y-4">
            {settings.map((setting) => (
                <Card key={setting.title}>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <setting.icon className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <CardTitle className="text-base">{setting.title}</CardTitle>
                                <CardDescription>{setting.description}</CardDescription>
                            </div>
                        </div>
                        <Icons.arrowRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                </Card>
            ))}

            <Button
                variant="destructive"
                className="w-full"
                onClick={logout}
            >
                <Icons.logout className="mr-2 h-4 w-4" />
                Sign Out
            </Button>
        </div>
    )
}