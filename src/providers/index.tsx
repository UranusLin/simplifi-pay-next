'use client'

import { ThemeProvider } from "next-themes"
import { Web3AuthProvider } from "./web3auth-provider"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <Web3AuthProvider>
                {children}
                <Toaster />
            </Web3AuthProvider>
        </ThemeProvider>
    )
}