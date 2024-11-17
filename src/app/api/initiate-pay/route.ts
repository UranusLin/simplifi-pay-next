import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const uuid = crypto.randomUUID().replace(/-/g, "")
    return NextResponse.json({ id: uuid })
}