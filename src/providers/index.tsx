'use client'

import { ThemeProvider } from "next-themes"
import { Web3AuthProvider } from "./web3auth-provider"
import { MiniKit } from "@worldcoin/minikit-js"
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const initMiniKit = async () => {
            try {
                await MiniKit.install()
                console.log("MiniKit installed:", MiniKit.isInstalled())
            } catch (error) {
                console.error("Failed to install MiniKit:", error)
            }
        }

        initMiniKit()
    }, [])

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