"use client";
import { QRCode } from "react-qrcode-logo";
import React from "react";
import { useSearchParams } from "next/navigation";
import { getFormattedWeek } from "@/lib/utils/getFormattedWeek";
import { useUser } from "@clerk/nextjs";

const CouponQRCode = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const day = searchParams.get("day");
  const meal = searchParams.get("meal");
  const week = getFormattedWeek();
  const qrData = JSON.stringify({
    userId: user?.id,
    week,
    day: day,
    meal: meal,
  });
  return (
    <div className="flex justify-center items-center mt-12">
      <div className="border shadow-2xl p-6 rounded-lg text-center">
        <h2 className="text-lg font-semibold mb-4">Your Coupon QR</h2>
        <p className="font-semibold">
          for <span>{day}</span>,
          <span className="capitalize ml-2">{meal}</span>
        </p>
        <QRCode value={qrData} size={200} />
      </div>
    </div>
  );
};

export default CouponQRCode;
