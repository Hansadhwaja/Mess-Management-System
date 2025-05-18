import React from "react";
import { getCouponMenuItems } from "@/lib/actions/buyCouponActions";
import Coupon from "@/components/Coupon";

const BuyCoupon = async () => {
  const items = await getCouponMenuItems();
  const menuItems = items.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">
          Coupons
        </h1>

        <Coupon menuItems={menuItems} />
      </div>
    </div>
  );
};

export default BuyCoupon;
