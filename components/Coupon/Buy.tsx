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
    <div className="py-10 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <Coupon menuItems={menuItems} />
      </div>
    </div>
  );
};

export default BuyCoupon;
