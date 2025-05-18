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

  const resetState = () => {
    setCouponData(null);
    setScanResult(null);
    setVerificationResult(null);
  };

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

      const res = await fetch("/api/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      setVerificationResult(json.valid ? "valid" : "invalid");
    } catch (error) {
      console.error("Scan error:", error);
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
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Verify Coupon
        </h2>

        <div className="w-full h-[300px] rounded-lg overflow-hidden shadow border border-gray-300">
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
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner border text-sm">
            <h3 className="font-semibold mb-2 text-gray-700">QR Code Data:</h3>
            <pre className="whitespace-pre-wrap break-words text-gray-600">
              {JSON.stringify(couponData, null, 2)}
            </pre>
          </div>
        )}

        {verificationResult === "valid" && (
          <p className="mt-4 text-center text-green-600 font-bold text-lg">
            ✅ Coupon is <span className="underline">VALID</span>
          </p>
        )}

        {verificationResult === "invalid" && (
          <p className="mt-4 text-center text-red-600 font-bold text-lg">
            ❌ Coupon is <span className="underline">INVALID</span>
          </p>
        )}

        {(verificationResult || scanResult) && (
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={resetState}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Next Scan
            </button>
            <button
              onClick={resetState}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminScanner;
