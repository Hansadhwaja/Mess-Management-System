import CouponQRCode from "@/components/Coupon/CouponQRCode";
import Loader from "@/components/Loader";
import React, { Suspense } from "react";

const QrCodePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2">
        QR Code
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <Suspense fallback={<Loader color="black" />}>
          <CouponQRCode />
        </Suspense>
      </div>
    </div>
  );
};

export default QrCodePage;
