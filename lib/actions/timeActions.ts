import { connectDB } from "../db"
import { Time } from "../models/timeModel";

export const getTimes = async () => {
    await connectDB();
    try {
        return await Time.find();
    } catch (error) {
        console.error("Error fetching times:", error);
        throw new Error("Failed to fetch times");
    }
}