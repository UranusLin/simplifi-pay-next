'use client'
import { useWalletStore } from "@/lib/stores/wallet"
import Jazzicon from 'react-jazzicon'

export function WalletAvatar({ size = 32 }: { size?: number }) {
    const { address } = useWalletStore()

    if (!address) {
        return (
            <div
                className="rounded-full flex items-center justify-center bg-muted"
                style={{
                    width: size,
                    height: size,
                }}
            >
                ?
            </div>
        )
    }

    // 计算 Jazzicon 的 seed，通常是将地址的一部分转为整数
    const seed = parseInt(address.slice(2, 10), 16)

    return (
        <Jazzicon diameter={size} seed={seed} />
    )
}