import { sendOTP } from "@/lib/sendOtp";
import { connectToDatabase } from "@/lib/database/db";
import Verification from "@/lib/database/models/verification.model";

export async function isUserVerified(email: String) {
    try {
        await connectToDatabase()
        const existingUser = await Verification.findOne({ email });

        if (!existingUser?.verified) {
            return JSON.parse(JSON.stringify(false))
        }

        return JSON.parse(JSON.stringify(true))

    } catch (error: any) {
        console.error(error);
        throw new Error(`Error: ${error}`);
    }
}

export async function startVerification({
    email,
    otp
}: {
    email: string,
    otp: string
}) {
    try {
        await Verification.create({ email, otp })
        await sendOTP(email, otp);
    } catch (error: any) {
        console.error(error);
        throw new Error(`Error: ${error}`)
    }
}