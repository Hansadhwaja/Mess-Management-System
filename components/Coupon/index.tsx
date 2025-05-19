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
    <div className="flex flex-col items-center sm:px-4 pb-32">
      {menuItems.map((item) => (
        <div
          key={item._id}
          className="w-full max-w-4xl rounded-2xl border shadow-md py-6 sm:p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-4 underline decoration-orange-500">
            {item.day}
          </h2>
          <CouponTable
            breakfast={item.breakfast}
            lunch={item.lunch}
            dinner={item.dinner}
            day={item.day}
          />
        </div>
      ))}

      <div className="sticky bottom-0 left-0 right-0 border-2 bg-black/50 backdrop-blur-lg border-white/10 shadow-xl p-2 sm:p-4 z-50 w-full rounded-xl">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <h3 className="sm:text-xl font-bold text-white">
            Total Cost:{" "}
            <span className="text-orange-500">{calculateTotalCost}/-</span>
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
