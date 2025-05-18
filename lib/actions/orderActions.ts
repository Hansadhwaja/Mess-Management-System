"use server";

import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "../db";
import Order from "../models/orderModel";
import Coupon from "../models/couponModel";
import { getUser } from "./userActions";
import { getFormattedWeek } from "../utils/getFormattedWeek";

interface CouponData {
    day: string;
    meal: string[];
}

export const createOrder = async ({
    amount,
    coupons,
}: {
    amount: number;
    coupons: CouponData[];
}) => {
    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
        throw new Error("User is not authenticated");
    }

    const user = await getUser({ clerkId: clerkUser.id });
    if (!user) {
        throw new Error("User not found in the database");
    }

    const week = getFormattedWeek();
    await connectDB();

    try {
        const order = await Order.create({
            userId: user._id,
            week,
            amount
        });

        const couponDocs = coupons.flatMap(({ day, meal }) =>
            meal.map((singleMeal) => ({
                userId: user._id,
                orderId: order._id,
                week,
                day,
                meal: singleMeal,
            }))
        );

        await Coupon.insertMany(couponDocs);

        console.log("Order and coupons created successfully");
        return { success: true };
    } catch (error) {
        console.error("Error creating order and coupons:", error);
        throw new Error("Failed to create order and coupons");
    }
};

export const getOrder = async () => {
    const clerkUser = await currentUser();
    if (!clerkUser?.id) throw new Error("User is not authenticated");

    const user = await getUser({ clerkId: clerkUser.id });
    if (!user) throw new Error("User not found in the database");

    await connectDB();
    const week = getFormattedWeek();

    try {

        const coupons = await Coupon.find({ userId: user._id, week });

        const grouped = coupons.reduce((acc, curr) => {
            if (!acc[curr.day]) {
                acc[curr.day] = [];
            }
            acc[curr.day].push({
                meal: curr.meal,
                used: curr.used,
                usedAt: curr.usedAt,
                id: curr._id.toString(),
            });
            return acc;
        }, {});

        const result = Object.keys(grouped).map((day) => ({
            day,
            meals: grouped[day],
        }));

        return { coupons: result };
    } catch (error) {
        console.error("Failed to get order:", error);
        throw new Error("Could not fetch coupons");
    }
};

export const getOrders = async () => {
    await connectDB();
    try {
        return await Order.find();
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
    }
};

export const getRecentOrders = async () => {
    await connectDB();
    try {
        return await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("userId", "name email image");
    } catch (error) {
        console.error("Error fetching recent orders:", error);
        throw new Error("Failed to fetch recent orders");
    }
};

export const getOrdersForWeek = async (week: string) => {
    await connectDB();
    try {
        return await Order.find({ week })
            .sort({ createdAt: -1 })
            .populate("userId", "name email image");
    } catch (error) {
        console.error("Error fetching weekly orders:", error);
        throw new Error("Failed to fetch orders for selected week");
    }
};

export const getOrderById = async ({ id }: { id: string }) => {
  await connectDB();

  try {
    const order = await Order.findById(id).populate("userId", "name email image");

    const coupons = await Coupon.find({ orderId: id });

    const groupedCoupons: Record<string, { day: string; meals: string[] }> = coupons.reduce(
      (acc, coupon) => {
        if (!acc[coupon.day]) {
          acc[coupon.day] = { day: coupon.day, meals: [] };
        }

        acc[coupon.day].meals.push(coupon.meal);
        return acc;
      },
      {} as Record<string, { day: string; meals: string[] }>
    );

    const groupedCouponsArray = Object.values(groupedCoupons);

    return { order, coupons: groupedCouponsArray };
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
};

