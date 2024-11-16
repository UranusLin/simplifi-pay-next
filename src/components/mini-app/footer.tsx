'use client'

import { FooterItem } from "./footer-item"

const footerItems = [
    {
        icon: "home",
        label: "Home",
        href: "/"
    },
    {
        icon: "payment",
        label: "Pay",
        href: "/pay"
    },
    {
        icon: "history",
        label: "History",
        href: "/history"
    },
    {
        icon: "user",
        label: "Profile",
        href: "/profile"
    }
] as const

export function MiniAppFooter() {
    return (
        <div className="sticky bottom-0 w-full border-t bg-background">
            <nav className="container h-16">
                <div className="grid h-full grid-cols-4 items-center justify-items-center">
                    {footerItems.map((item) => (
                        <FooterItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                        />
                    ))}
                </div>
            </nav>
        </div>
    )
}