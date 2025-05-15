"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useCouponStore } from "@/store/couponStore";

const PendingPurchase = () => {
  const { selectedCoupons } = useCouponStore();
  const selectedCouponsCount = selectedCoupons.length;
  if (selectedCouponsCount !== 0) {
    return (
      <div className="flex shadow-2xl items-center p-4 bg-gradient-to-r from-orange-500 to-orange-300 w-full rounded-xl justify-between">
        <h1 className="font-semibold">
          You have selected coupons left for purchasing.Purchase Now.
        </h1>
        <Link href="/coupon">
          <Button className="hover:cursor-pointer">Purchase Now</Button>
        </Link>
      </div>
    );
  }
};

export default PendingPurchase;
