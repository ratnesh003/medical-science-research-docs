import { getFeedbacksByFolderId } from "@/lib/database/actions/feedbacks.action";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ folderId: string }> }) {
    try {
        const { folderId } = await params
        const feedbacks = await getFeedbacksByFolderId(folderId)
        return NextResponse.json({ data: feedbacks }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 499 });
    }
}