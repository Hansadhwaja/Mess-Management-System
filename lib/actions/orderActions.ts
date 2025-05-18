"use server";

import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "../db";
import Order from "../models/orderModel";
import { getUser } from "./userActions";
import { getFormattedWeek } from "../utils/getFormattedWeek";
import { sortByWeekDays } from "../utils/sortByWeekDays";

interface Coupon {
    day: string;
    meal: string[];
}

export const createOrder = async ({
    amount,
    coupons,
}: {
    amount: number;
    coupons: Coupon[];
}) => {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.id) {
        throw new Error("User is not authenticated");
    }

    const user = await getUser({ clerkId: clerkUser.id });

    if (!user) {
        throw new Error("User not found in the database");
    }
    const week = getFormattedWeek();

    await connectDB();

    try {
        await Order.create({
            userId: user._id,
            week,
            amount,
            coupons,
        });

        console.log("Order created successfully");
        return { success: true };
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    }
};

export const getOrder = async () => {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.id) {
        throw new Error("User is not authenticated");
    }

    const user = await getUser({ clerkId: clerkUser.id });

    if (!user) {
        throw new Error("User not found in the database");
    }
    const week = getFormattedWeek();

    await connectDB();

    try {
        const order = await Order.findOne({ userId: user._id, week });
        const sortedCoupons = sortByWeekDays(order?.coupons || []);

        return { ...order, coupons: sortedCoupons };
    } catch (error) {
        console.error("Error fetching order:", error);
        throw new Error("Failed to fetch order");
    }
}

export const getOrders = async () => {
    await connectDB();
    try {
        return await Order.find();
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
    }
}

export const getRecentOrders = async () => {
    await connectDB();
    try {
        return await Order.find()
            .sort({ createdAt: -1 })
            .limit(5).populate("userId", "name email image");
    } catch (error) {
        console.error("Error fetching recent orders:", error);
        throw new Error("Failed to fetch recent orders");
    }
}

export const getOrdersForWeek = async (week: string) => {
    await connectDB();
    try {
        return await Order.find({ week }).sort({ createdAt: -1 }).populate("userId", "name email image");
    } catch (error) {
        console.error("Error fetching weekly orders:", error);
        throw new Error("Failed to fetch orders for selected week");
    }
};

export const getOrderById = async ({ id }: { id: string }) => {
    await connectDB();
    try {
        return await Order.findById(id).populate("userId", "name email image");
    } catch (error) {
        console.error("Error fetching order:", error);
        throw new Error("Failed to fetch order");
    }
}
