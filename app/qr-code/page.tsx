import CouponQRCode from "@/components/Coupon/CouponQRCode";
import React from "react";

const QrCodePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold">Qr Code</h1>
      <CouponQRCode />
    </div>
  );
};

export default QrCodePage;
