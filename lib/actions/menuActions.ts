'use server';

import { connectDB } from "../db";
import { Menu } from "../models/menuModel";

export const getMenuItems = async () => {
    await connectDB();

    try {
        return await Menu.find().sort({ serialNumber: 1 });
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw new Error("Failed to fetch menu items");
    }
};
