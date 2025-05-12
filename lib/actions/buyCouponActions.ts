import { connectDB } from "../db";
import { Menu } from "../models/menuModel";
import { Time } from "../models/timeModel";

export const getCouponMenuItems = async () => {
    await connectDB();

    try {
        const times = await Time.find();
        const menus = await Menu.find().sort({ serialNumber: 1 });

        const couponMenuItems = menus.map((menuItem) => {
            const breakfastTime = times.find((t) => t.meal === "Breakfast");
            const lunchTime = times.find((t) => t.meal === "Lunch");
            const dinnerTime = times.find((t) => t.meal === "Dinner");

            return {
                _id: menuItem._id,
                day: menuItem.day,
                breakfast: breakfastTime
                    ? {
                        type: "Breakfast",
                        time: breakfastTime.time,
                        cost: breakfastTime.cost,
                        items: menuItem.breakfast,
                    }
                    : null,
                lunch: lunchTime
                    ? {
                        type: "Lunch",
                        time: lunchTime.time,
                        cost: lunchTime.cost,
                        items: menuItem.lunch,
                    }
                    : null,
                dinner: dinnerTime
                    ? {
                        type: "Dinner",
                        time: dinnerTime.time,
                        cost: dinnerTime.cost,
                        items: menuItem.dinner,
                    }
                    : null,
            };
        });

        return couponMenuItems;
    } catch (error) {
        console.error("Error fetching coupon menu items:", error);
        throw new Error("Failed to fetch coupon menu items");
    }
};
