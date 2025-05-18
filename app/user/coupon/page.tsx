import BuyCoupon from "@/components/Coupon/Buy";
import ExistingOrder from "@/components/Coupon/Existing";
import { getOrder } from "@/lib/actions/orderActions";
import React from "react";

const CouponPage = async () => {
  const { coupons } = await getOrder();
  const orderExists = coupons && coupons.length > 0;

  return (
    <div className="min-h-screen py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          {orderExists ? "Your Purchased Coupons" : "Buy Your Meal Coupon"}
        </h1>

        {orderExists ? <ExistingOrder coupons={coupons} /> : <BuyCoupon />}
      </div>
    </div>
  );
};

export default CouponPage;
