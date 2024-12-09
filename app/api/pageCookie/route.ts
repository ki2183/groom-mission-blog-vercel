import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const currentPage = req.cookies.get("currentPage")?.value || null;

    return NextResponse.json({ currentPage });
}