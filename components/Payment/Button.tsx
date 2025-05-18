"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { createOrder } from "@/lib/actions/orderActions";
import { useCouponStore } from "@/store/couponStore";
import { useRouter } from "next/navigation";
import Loader from "../Loader";

const PaymentButton = ({ amount }: { amount: number }) => {
  const { selectedCoupons, clearSelectedCoupons } = useCouponStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const simulatePayment = async () => {
    setIsLoading(true);

    await new Promise((res) => setTimeout(res, 1500));

    await createOrder({
      amount,
      coupons: selectedCoupons,
    });
    clearSelectedCoupons();
    setIsLoading(false);
    alert("Payment successful! 🎉");
    router.push("/user/coupon");
  };

  return (
    <Button
      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded hover:cursor-pointer"
      onClick={simulatePayment}
    >
      {isLoading ? (
        <>
          <Loader color="white" /> processing
        </>
      ) : (
        `Pay ₹${amount}/- only`
      )}
    </Button>
  );
};

export default PaymentButton;
