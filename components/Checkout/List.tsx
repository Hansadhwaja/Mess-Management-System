"use client";

import React from "react";
import { useCouponStore } from "@/store/couponStore";
import { dayOrder } from "@/constants";
import Loader from "../Loader";
import PaymentButton from "../Payment/Button";

interface CheckoutListProps {
  timeOptions: {
    meal: string;
    cost: number;
  }[];
}

const CheckoutList = ({ timeOptions }: CheckoutListProps) => {
  const { selectedCoupons } = useCouponStore();
  let total = 0;

  const sortedCoupons = [...selectedCoupons].sort(
    (a, b) =>
      dayOrder.indexOf(a.day.toLowerCase()) -
      dayOrder.indexOf(b.day.toLowerCase())
  );

  if (selectedCoupons.length === 0) return <Loader color="black" />;

  return (
    <div className="p-6 rounded-xl border shadow-md">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCoupons.map((entry, index) => (
          <div
            key={index}
            className="border border-gray-200 shadow-lg p-4 rounded-xl"
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-3 underline">
              {entry.day}
            </h2>
            <div className="space-y-2">
              {entry.meal.map((meal, mealIndex) => {
                const mealCost =
                  timeOptions.find(
                    (time) => time.meal.toLowerCase() === meal.toLowerCase()
                  )?.cost || 0;
                total += mealCost;

                return (
                  <div
                    key={mealIndex}
                    className="flex justify-between items-center"
                  >
                    <p className="capitalize text-lg font-medium text-white">
                      {mealIndex + 1}. {meal}
                    </p>
                    <p className="text-lg font-semibold text-gray-100">
                      ₹{mealCost}/-
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <hr className="my-8 border-t-2" />

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-green-700">Total: ₹{total}/-</h2>
        <PaymentButton amount={total} />
      </div>
    </div>
  );
};

export default CheckoutList;
