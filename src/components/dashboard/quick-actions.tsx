'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Icons } from "@components/icons"
import { cn } from "@lib/utils"

const actions = [
    {
        title: "Send Payment",
        icon: Icons.send,
        onClick: () => {},
    },
    {
        title: "Request Payment",
        icon: Icons.request,
        onClick: () => {},
    },
    {
        title: "Add Merchant",
        icon: Icons.addStore,
        onClick: () => {},
    },
]

interface QuickActionsProps {
    className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
    return (
        <Card className={cn("col-span-3", className)}>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {actions.map((action) => (
                    <Button
                        key={action.title}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={action.onClick}
                    >
                        <action.icon className="mr-2 h-4 w-4" />
                        {action.title}
                    </Button>
                ))}
            </CardContent>
        </Card>
    )
}