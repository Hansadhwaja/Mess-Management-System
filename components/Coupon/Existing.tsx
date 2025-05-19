import React from "react";
import PerDayCoupon from "./PerDayCoupon";
import { CouponMeal } from "@/types/types";
interface ExistingOrderProps {
  coupons: {
    day: string;
    meals: CouponMeal[];
  }[];
}

const ExistingOrder = async ({ coupons }: ExistingOrderProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid gap-6 w-full max-w-3xl">
        {coupons.map((couponDay) => (
          <div
            key={couponDay.day}
            className="rounded-xl shadow-md border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-100 uppercase mb-4 border-b pb-2">
              {couponDay.day}
            </h2>
            <PerDayCoupon meals={couponDay.meals} day={couponDay.day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExistingOrder;
