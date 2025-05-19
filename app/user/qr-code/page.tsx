import CouponQRCode from "@/components/Coupon/CouponQRCode";
import Loader from "@/components/Loader";
import React, { Suspense } from "react";

const QrCodePage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-black/50 backdrop-blur-2xl p-8 sm:p-12 rounded-xl shadow-2xl md:w-md">
        <h1 className="text-4xl font-semibold text-gray-100 mb-6 border-b-4 border-blue-500 pb-2">
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
