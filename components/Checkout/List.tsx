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
    <div className="p-8 rounded-lg">
      <div className="flex flex-wrap gap-4">
        {sortedCoupons.map((entry, index) => (
          <div
            key={index}
            className="min-w-[300px] border shadow-md p-4 rounded-lg"
          >
            <h1 className="font-semibold underline mb-2 text-xl">
              {entry.day}
            </h1>
            <div>
              {entry.meal.map((meal, mealIndex) => {
                const mealCost = timeOptions?.find(
                  (time) => time.meal.toLowerCase() === meal.toLowerCase()
                )?.cost;
                total += mealCost || 0;
                return (
                  <div
                    key={mealIndex}
                    className="text-sm flex justify-between py-2"
                  >
                    <p className="text-xl">
                      {mealIndex + 1}.
                      <span className="capitalize ml-2">{meal}</span>
                    </p>
                    <p className="font-semibold text-xl">
                      {mealCost}
                      /-
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <hr className="mt-8" />
      <div className="flex gap-12 text-lg p-8 justify-center">
        <h2 className="lg:text-xl font-semibold mb-4">Total:</h2>
        <p className="font-semibold text-xl xl:text-2xl">₹{total}/-</p>
        <PaymentButton amount={total} />
      </div>
    </div>
  );
};

export default CheckoutList;
