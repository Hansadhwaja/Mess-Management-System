'use server';

import { connectDB } from "../db"
import { Time } from "../models/timeModel";

interface UpdateTime {
    meal: string;
    time: string;
    cost: number;
}

export const getTimes = async () => {
    await connectDB();
    try {
        return await Time.find();
    } catch (error) {
        console.error("Error fetching times:", error);
        throw new Error("Failed to fetch times");
    }
};

export const updateTiming = async (updatedValues: UpdateTime) => {
    await connectDB();
    try {
        const newTiming = await Time.findOneAndUpdate({ meal: updatedValues?.meal }, { $set: updatedValues }, { new: true });
        if (newTiming) {
            return ({ status: 200, message: "Menu Timing updated successfully" });
        }
        else {
            return { status: 404, message: "Menu Timing not found" };
        }
    } catch (error) {
        console.error("Error updating menu timing:", error);
        throw new Error("Failed to update menu timing");
    }
};

export const addTiming = async (values: UpdateTime) => {
  await connectDB();
  try {
    const existing = await Time.findOne({ meal: values.meal });
    if (existing) {
      return { status: 409, message: "Meal timing already exists" };
    }

    const newTime = new Time(values);
    await newTime.save();

    return { status: 201, message: "Meal timing added successfully" };
  } catch (error) {
    console.error("Error adding meal timing:", error);
    return { status: 500, message: "Failed to add meal timing" };
  }
};

export const deleteAllTimings = async () => {
  await connectDB();
  try {
    const result = await Time.deleteMany({});
    return {
      status: 200,
      message: `${result.deletedCount} meal timing(s) deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting all meal timings:", error);
    return { status: 500, message: "Failed to delete all meal timings" };
  }
};