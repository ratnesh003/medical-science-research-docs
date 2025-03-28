import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/db";
import Verification from "@/lib/database/models/verification.model";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, otp } = await req.json();

    const record = await Verification.findOne({ email, otp });

    if (!record) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    await Verification.updateOne({ email }, { verified: true });

    return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "OTP verification failed" }, { status: 500 });
  }
}
