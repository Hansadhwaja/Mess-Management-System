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
    day,
    meal,
  });

  return (
    <div className="flex justify-center items-center">
      <div className="shadow-xl rounded-2xl p-6 w-full max-w-sm text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Your Coupon</h2>
        <p className="text-gray-200 mb-4">
          <span className="font-semibold capitalize">{meal}</span> on{" "}
          <span className="font-semibold">{day}</span>
        </p>
        <div className="flex justify-center">
          <QRCode
            value={qrData}
            size={200}
            quietZone={10}
            logoImage="/logo-white.png" 
            logoWidth={30}
            ecLevel="H"
            bgColor="#ffffff"
            fgColor="#1f2937" 
          />
        </div>
        <p className="text-xs text-gray-300 mt-4">Week: {week}</p>
      </div>
    </div>
  );
};

export default CouponQRCode;
