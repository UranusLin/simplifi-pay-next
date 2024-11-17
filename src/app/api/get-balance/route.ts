import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { address } = await req.json()

        // 這裡需要根據你的需求調整 API endpoint
        const response = await fetch(
            `https://developer.worldcoin.org/api/v2/balance/${address}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.WORLD_APP_API_KEY}`
                }
            }
        )

        const data = await response.json()
        return NextResponse.json({ balance: data.balance })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch balance' },
            { status: 500 }
        )
    }
}