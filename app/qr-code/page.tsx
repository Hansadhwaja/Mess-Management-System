import CouponQRCode from "@/components/Coupon/CouponQRCode";
import Loader from "@/components/Loader";

import React, { Suspense } from "react";

const QrCodePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold">Qr Code</h1>
      <Suspense fallback={<Loader color="black" />}>
        <CouponQRCode />
      </Suspense>
    </div>
  );
};

export default QrCodePage;
