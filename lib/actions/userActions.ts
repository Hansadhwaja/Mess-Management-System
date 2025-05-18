
'use server';

import { connectDB } from "../db";
import { User } from "../models/userModel";

export const getUser = async ({ clerkId }: { clerkId: string }) => {
    await connectDB();
    try {
        return await User.findOne({ clerkId });

    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user");
    }

}

export const getUsers = async () => {
    await connectDB();
    try {
        return await User.find();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
}