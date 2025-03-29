import { connectToDatabase } from "../db";
import Feedback from "@/lib/database/models/feedbacks.model";

export async function getFeedbacksByFolderId(folderId: String) {
    try {
        await connectToDatabase()
        const feedbacks = await Feedback.find({ folderId }).sort({ createdAt: -1 }).exec();
        return JSON.parse(JSON.stringify(feedbacks))
    } catch (error: any) {
        console.error(error);
        throw new Error(`Error: ${error}`);
    }
}

export async function addFeedback(
    {
        email,
        username,
        content,
        folderId
    }: {
        email: String,
        username: String,
        content: String,
        folderId: String
    }
) {
    try {
        await connectToDatabase()
        const feedback = await Feedback.create({ email, username, content, folderId })
        return JSON.parse(JSON.stringify(feedback))
    } catch (error: any) {
        console.error(error);
        throw new Error(`Error: ${error}`);
    }
}