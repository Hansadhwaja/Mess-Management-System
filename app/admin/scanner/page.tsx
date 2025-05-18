"use client";

import React, { useEffect, useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";

const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

const AdminScanner = () => {
  const [constraints, setConstraints] = useState({ facingMode: "user" });
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [couponData, setCouponData] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<
    "valid" | "invalid" | null
  >(null);

  useEffect(() => {
    if (isMobile()) {
      setConstraints({ facingMode: "environment" });
    }
  }, []);

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length === 0) return;

    const code = detectedCodes[0].rawValue;

    if (!code) return;

    try {
      const data = JSON.parse(code);
      setCouponData(data);
      setScanResult(null);
      setVerificationResult(null);
      setVerifying(true);

      const res = await fetch("/api/verify-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();

      setVerificationResult(json.valid ? "valid" : "invalid");
    } catch (error) {
      console.log(error);
      setScanResult("Invalid QR content or verification failed.");
      setCouponData(null);
      setVerificationResult(null);
    } finally {
      setVerifying(false);
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
          constraints={constraints}
        />
      </div>

      {verifying && (
        <p className="mt-4 text-center text-blue-600 font-semibold">
          Verifying...
        </p>
      )}

      {scanResult && (
        <p className="mt-4 text-center text-red-600 font-semibold">
          {scanResult}
        </p>
      )}

      {couponData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow max-w-md mx-auto">
          <h3 className="font-semibold mb-2">QR Code Data:</h3>
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(couponData, null, 2)}
          </pre>
        </div>
      )}

      {verificationResult === "valid" && (
        <p className="mt-4 text-center text-green-600 font-bold">
          Coupon is <span className="underline">VALID</span>
        </p>
      )}

      {verificationResult === "invalid" && (
        <p className="mt-4 text-center text-red-600 font-bold">
          Coupon is <span className="underline">INVALID</span>
        </p>
      )}
    </div>
  );
};

export default AdminScanner;
