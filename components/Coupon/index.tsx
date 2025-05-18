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
    <div className="flex flex-col items-center px-4 pb-24">
      {menuItems.map((item) => (
        <div
          key={item._id}
          className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 underline decoration-orange-500">
            {item.day}
          </h2>
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

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-xl font-bold text-gray-800">
            Total Cost: <span className="text-orange-600">{calculateTotalCost}/-</span>
          </h3>
          <Link href="/user/checkout">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl transition-all duration-200">
              Buy Coupon
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
