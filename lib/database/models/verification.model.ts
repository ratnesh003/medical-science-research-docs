import { Schema, model, models } from "mongoose";

const VerificationSchema = new Schema(
    {
        email: {
            type: String,
            required: true, 
            unique: true
        },
        otp: { 
            type: String, 
            required: true 
        },
        verified: { 
            type: Boolean, 
            default: false 
        },
    },
    { timestamps: true }
);

const Verification = models?.Verification || model("Verification", VerificationSchema);
export default Verification;