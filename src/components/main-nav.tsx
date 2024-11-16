'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

export function MainNav() {
    const pathname = usePathname()

    const routes = [
        {
            href: "/dashboard",
            label: "Dashboard",
            active: pathname === "/dashboard",
        },
        {
            href: "/payments",
            label: "Payments",
            active: pathname === "/payments",
        },
        {
            href: "/history",
            label: "History",
            active: pathname === "/history",
        },
    ]

    return (
        <nav className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">SimpliFi Pay</span>
            </Link>
            <div className="flex gap-6">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        {route.label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}