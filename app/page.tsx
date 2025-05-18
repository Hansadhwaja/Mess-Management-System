"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      router.push("/onboarding");
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100 px-6 text-gray-900">
      <div className="max-w-4xl flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-md">
            Welcome to <span className="text-orange-600">Mess Management</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-md">
            Simplify your mess meal planning and ordering. Buy coupons, track
            orders, and enjoy hassle-free meals every day!
          </p>
          <Link href="/coupons">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg px-8 py-3 shadow-lg transition">
              Buy Coupons Now
            </Button>
          </Link>

          <ul className="mt-6 space-y-3 text-gray-700 max-w-md">
            <li>✅ Easy meal planning and tracking</li>
            <li>✅ Secure and instant coupon purchase</li>
            <li>✅ Flexible and convenient ordering</li>
          </ul>
        </div>

        <div className="w-full max-w-sm">
          <Image
            src="/spaghetti-1260818_1280.jpg"
            alt="Mess Management Illustration"
            width={400}
            height={400}
            className="rounded-lg shadow-md"
            priority
          />
        </div>
      </div>
    </div>
  );
}
