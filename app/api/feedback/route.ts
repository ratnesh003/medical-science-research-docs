import { NextResponse } from "next/server";
import { addFeedback, getFeedbacksByFolderId } from "@/lib/database/actions/feedbacks.action";
import { isUserVerified, startVerification } from "@/lib/database/actions/verification.action";

export async function POST(req: Request) {
  try {
    const { email, username, content, folderId } = await req.json();

    const existingUser = await isUserVerified(email);

    if (!existingUser) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await startVerification({ email, otp })
      return NextResponse.json(
        { requiresVerification: true, message: "OTP sent to your email." },
        { status: 200 }
      );
    }

    await addFeedback({ email, username, content, folderId });
    return NextResponse.json({ message: "Comment posted successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}

// export async function GET(req: Request) {
//   try {
//     const { folderId } = await req.json()
//     const feedbacks = await getFeedbacksByFolderId(folderId)
//     return NextResponse.json({data: feedbacks}, { status: 200 })
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 499 });
//   }
// }