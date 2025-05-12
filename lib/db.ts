import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

if (!URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}
let isConnected: boolean = false;

export const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        await mongoose.connect(URI);
        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");

    }
};
