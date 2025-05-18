import { Coupon } from "@/types/types";
import React from "react";
import PerDayCoupon from "./PerDayCoupon";

interface ExistingOrderProps {
  coupons: Coupon[];
}

const ExistingOrder = async ({ coupons }: ExistingOrderProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid gap-6 w-full max-w-3xl">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="rounded-xl shadow-md bg-white border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 uppercase mb-4 border-b pb-2">
              {coupon.day}
            </h2>
            <PerDayCoupon meal={coupon.meal} day={coupon.day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExistingOrder;
