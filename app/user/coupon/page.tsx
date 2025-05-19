import BuyCoupon from "@/components/Coupon/Buy";
import ExistingOrder from "@/components/Coupon/Existing";
import { getOrder } from "@/lib/actions/orderActions";
import { sortByWeekDays } from "@/lib/utils/sortByWeekDays";
import React from "react";

const CouponPage = async () => {
  const { coupons } = await getOrder();
  const orderExists = coupons?.length > 0;
  const sortedCoupons = sortByWeekDays(coupons);

  return (
    <div className="min-h-[80vh] py-10 px-1 sm:px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-xl bg-black/50 backdrop-blur-2xl shadow-2xl p-6 md:p-10 border border-white/10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-8 tracking-wide">
          {orderExists ? "Your Purchased Coupons" : "Buy Your Meal Coupon"}
        </h1>

        {orderExists ? (
          <ExistingOrder coupons={sortedCoupons} />
        ) : (
          <BuyCoupon />
        )}
      </div>
    </div>
  );
};

export default CouponPage;
