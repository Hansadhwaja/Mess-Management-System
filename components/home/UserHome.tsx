import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const features = [
  "Seamless meal planning & tracking",
  "Instant and secure coupon purchases",
  "Flexible ordering experience",
];

const UserHome = () => {
  return (
    <div className="relative w-full pt-24 h-full">
      <div className="absolute inset-0 bg-black/50 z-10 h-full" />
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-white text-center">
        <div className="bg-black/60 p-10 rounded-xl backdrop-blur-md shadow-2xl max-w-2xl w-full space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Welcome to <span className="text-orange-400">Mess Management</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Your all-in-one solution for managing daily meals, buying coupons,
            and tracking orders.
          </p>

          <Link href="/user/coupon">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition">
              Buy Coupons Now
            </Button>
          </Link>

          <div className="mt-6 grid gap-4 text-left">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="text-green-400 w-6 h-6 mt-1" />
                <p className="text-base md:text-lg text-gray-100">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
