"use client";

import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import React, { useState } from "react";

type CouponData = {
  userId: string;
  week: number;
  day: string;
  meal: string;
};

type QrDataType = CouponData | string;

const AdminScanner: React.FC = () => {
  const [qrData, setQrData] = useState<QrDataType | null>(null);

  const handleScan = (codes: IDetectedBarcode[]) => {
    if (!codes || codes.length === 0) return;

    const text = codes[0]?.rawValue;
    if (!text) return;

    try {
      const parsed = JSON.parse(text);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "userId" in parsed &&
        "week" in parsed &&
        "day" in parsed &&
        "meal" in parsed
      ) {
        setQrData(parsed as CouponData);
      } else {
        setQrData("QR code does not contain valid coupon data.");
      }
    } catch {
      setQrData("Invalid QR content: " + text);
    }
  };

  const handleError = (error: unknown) => {
    console.warn("Scanner error:", error);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Verify Coupon</h2>

      <div className="w-[300px] h-[300px] mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-300">
        <Scanner
          onScan={handleScan}
          onError={handleError}
          constraints={{
            facingMode: "environment",
          }}
        />
      </div>

      {qrData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow text-sm max-w-md mx-auto">
          <h3 className="font-semibold mb-2">QR Code Data:</h3>
          <pre className="whitespace-pre-wrap break-words">
            {typeof qrData === "string"
              ? qrData
              : JSON.stringify(qrData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AdminScanner;
