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
    <div className="flex flex-col min-h-screen p-4 items-center">
      <h1 className="text-3xl font-bold mb-4">Coupon</h1>
      <Coupon menuItems={menuItems} />
    </div>
  );
};

export default BuyCoupon;
