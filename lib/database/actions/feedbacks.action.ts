import { connectToDatabase } from "../db";

export async function getFeedbacksByFolderId(folderId: String) {
    try {
        await connectToDatabase()
    } catch (error: any) {
        
    }
}