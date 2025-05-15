import { Coupon } from "@/types/types";
import React from "react";
import PerDayCoupon from "./PerDayCoupon";

interface ExistingOrderProps {
  coupons: Coupon[];
}

const ExistingOrder = async ({ coupons }: ExistingOrderProps) => {
  return (
    <div className="flex flex-col min-h-screen p-4 w-full items-center">
      <h1 className="text-2xl font-semibold mb-4 text-center">Your Coupons</h1>
      <div className="flex flex-col gap-4">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="w-full flex flex-col gap-4 mt-8">
            <h1 className="font-semibold text-2xl uppercase">{coupon.day}</h1>
            <PerDayCoupon meal={coupon.meal} day={coupon.day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExistingOrder;
