import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const uuid = crypto.randomUUID().replace(/-/g, "");
    // TODO: Store the ID in database
    return NextResponse.json({ id: uuid });
}