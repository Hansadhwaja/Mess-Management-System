"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useCouponStore } from "@/store/couponStore";

const PendingPurchase = () => {
  const { selectedCoupons } = useCouponStore();
  const selectedCouponsCount = selectedCoupons.length;

  if (selectedCouponsCount === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row shadow-2xl items-center p-4 bg-black/50 backdrop-blur-2xl w-full rounded-xl justify-between gap-2 sm:gap-0">
      <h1 className="font-semibold text-white text-center sm:text-left">
        You have {selectedCouponsCount} coupon
        {selectedCouponsCount > 1 ? "s" : ""} pending purchase.
      </h1>
      <Link href="/user/coupon">
        <Button className="bg-white text-orange-600 hover:bg-orange-100 hover:text-orange-700 font-semibold">
          Purchase Now
        </Button>
      </Link>
    </div>
  );
};

export default PendingPurchase;
