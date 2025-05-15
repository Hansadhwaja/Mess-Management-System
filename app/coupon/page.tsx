import BuyCoupon from "@/components/Coupon/Buy";
import ExistingOrder from "@/components/Coupon/Existing";
import { getOrder } from "@/lib/actions/orderActions";
import { Order } from "@/types/types";
import React from "react";

const CouponPage = async () => {
  const order: Order | null = await getOrder();
  const orderExists = order && order.coupons.length > 0;
  return (
    <div className="flex flex-col min-h-screen p-4 items-center">
      {orderExists ? <ExistingOrder coupons={order.coupons} /> : <BuyCoupon />}
    </div>
  );
};

export default CouponPage;
