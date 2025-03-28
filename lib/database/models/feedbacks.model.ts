import { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address",
        ],
    },
    username: {
        type: String,
        minLength: 5
    },
    content: {
        type: String,
        default: ""
    },
    folderId: { 
        type: String,
        unique: true
    },
}, {
    timestamps: true
})

const Feedback = models?.Feedback || model("Feedback", FeedbackSchema);

export default Feedback;