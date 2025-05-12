"use client";

import React from "react";
import CouponTable from "./Table";
import { CouponProps } from "@/types/types";
import { Button } from "../ui/button";
import { useCouponStore } from "@/store/couponStore";
import Link from "next/link";
type MealType = "breakfast" | "lunch" | "dinner";

const Coupon = ({ menuItems }: CouponProps) => {
  const { selectedCoupons } = useCouponStore();
  const calculateTotalCost = selectedCoupons.reduce((total, entry) => {
    const dayItem = menuItems.find((item) => item.day === entry.day);
    if (dayItem) {
      const mealCosts = entry.meal.reduce((sum, meal) => {
        const mealItem = dayItem[meal as MealType];
        return sum + (mealItem ? mealItem.cost : 0);
      }, 0);
      return total + mealCosts;
    }
    return total;
  }, 0);

  return (
    <>
      <div>
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="w-full max-w-4xl p-4 border rounded-lg shadow-md mb-4 "
          >
            <h1 className="font-semibold text-xl text-center underline">
              {item.day}
            </h1>
            <CouponTable
              {...{
                breakfast: item.breakfast,
                lunch: item.lunch,
                dinner: item.dinner,
                day: item.day,
              }}
            />
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white shadow-md flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold mb-4">
          Total Cost:
          <span className="ml-2">{calculateTotalCost}/-</span>
        </h1>
        <Link href="/checkout">
          <Button className="bg-orange-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-orange-600">
            Buy Coupon
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Coupon;
