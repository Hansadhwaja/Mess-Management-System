import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type:
            String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum:["Student","Admin"],
        default: "Student"
    }

}, { timestamps: true, versionKey: false });
export const User = mongoose.models.User || mongoose.model("User", userSchema);