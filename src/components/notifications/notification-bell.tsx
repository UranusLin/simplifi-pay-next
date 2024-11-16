'use client'

import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useNotificationStore } from "@/lib/stores/notification"
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function NotificationBell() {
    const router = useRouter()
    const { notifications, markAsRead } = useNotificationStore()
    const [open, setOpen] = useState(false)

    const unreadCount = notifications.filter(n => !n.read).length

    const handleNotificationClick = (notification: any) => {
        markAsRead(notification.id)
        setOpen(false)
        if (notification.paymentId) {
            router.push(`/payment/${notification.paymentId}`)
        }
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 rounded-full"
                >
                    <Icons.notification className="h-5 w-5" />
                    {/* 如果有未讀通知，顯示數字 */}
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                0
            </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No notifications
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <DropdownMenuItem
                            key={notification.id}
                            className={cn(
                                "flex flex-col items-start p-4 cursor-pointer",
                                !notification.read && "bg-muted"
                            )}
                            onClick={() => handleNotificationClick(notification)}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                {notification.type === 'success' && <Icons.check className="h-4 w-4 text-green-500" />}
                                {notification.type === 'error' && <Icons.error className="h-4 w-4 text-red-500" />}
                                {notification.type === 'warning' && <Icons.error className="h-4 w-4 text-yellow-500" />}
                                {notification.type === 'info' && <Icons.info className="h-4 w-4 text-blue-500" />}
                                <span className="font-medium">{notification.title}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <span className="text-xs text-muted-foreground mt-2">
                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
              </span>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}