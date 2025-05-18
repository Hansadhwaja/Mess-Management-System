'use server';

import { connectDB } from "../db";
import { Menu } from "../models/menuModel";
import { format } from 'date-fns';

interface UpdateMenu {
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
}

export const getMenuItems = async () => {
    await connectDB();

    try {
        return await Menu.find().sort({ serialNumber: 1 });
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw new Error("Failed to fetch menu items");
    }
};

export const getTodaysMenu = async () => {
    const today = new Date();
    const dayOfWeek = format(today, 'EEEE');
    await connectDB();
    try {
        return await Menu.findOne({ day: dayOfWeek });
    } catch (error) {
        console.error("Error fetching todays menu:", error);
        throw new Error("Failed to fetch todays menu");
    }
}

export const updateMenu = async (updatedMenu: UpdateMenu) => {
    await connectDB();
    try {
        const newMenu = await Menu.findOneAndUpdate({ day: updatedMenu?.day }, { $set: updatedMenu }, { new: true });
        if (newMenu) {
            return ({ status: 200, message: "Menu updated successfully" });
        }
        else {
            return { status: 404, message: "Menu item not found" };
        }
    } catch (error) {
        console.error("Error updating menu:", error);
        throw new Error("Failed to update menu");
    }
}

export const deleteAllMenus = async () => {
    await connectDB();
    try {
        await Menu.deleteMany({});

        return {
            status: 200,
            message: "Deleted menu items successfully"
        }
    } catch (error) {
        console.error("Error deleting all menus:", error);
        throw new Error("Failed to delete all menus");
    }
};

export const addMenu = async (item: { day: string; breakfast: string; lunch: string; dinner: string }) => {
  await connectDB();
  try {
    await Menu.findOneAndUpdate({ day: item.day }, item, { upsert: true, new: true });
  } catch (error) {
    console.error('Error saving menu:', error);
    throw new Error('Failed to save menu');
  }
};
