'use client'

import { Icons } from "@/components/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface FooterItemProps {
    icon: keyof typeof Icons
    label: string
    href: string
}

export function FooterItem({ icon, label, href }: FooterItemProps) {
    const pathname = usePathname()
    const Icon = Icons[icon]
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`flex flex-col items-center justify-center gap-1 ${
                isActive ? "text-primary" : "text-muted-foreground"
            }`}
        >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{label}</span>
        </Link>
    )
}