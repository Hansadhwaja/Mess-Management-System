import CouponQRCode from "@/components/Coupon/CouponQRCode";
import Loader from "@/components/Loader";
import React, { Suspense } from "react";

const QrCodePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white p-12 rounded-xl shadow-2xl w-md">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2">
          QR Code
        </h1>

        <div>
          <Suspense fallback={<Loader color="black" />}>
            <CouponQRCode />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QrCodePage;
