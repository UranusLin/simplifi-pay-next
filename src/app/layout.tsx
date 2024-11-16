import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/providers"
import { MiniAppHeader } from "@/components/mini-app/header"
import { MiniAppFooter } from "@/components/mini-app/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "SimpliFi Pay",
    description: "Secure, private, and seamless crypto payments"
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
            <MiniAppHeader />
            <main className="flex-1 container mx-auto px-4 py-2">
                {children}
            </main>
            <MiniAppFooter />
        </Providers>
        </body>
        </html>
    )
}