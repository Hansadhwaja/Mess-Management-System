import Link from "next/link";
import { Button } from "../ui/button";

export default function GuestHome() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 flex flex-col flex-wrap items-center pt-36 text-center px-6 text-white">
        <div className="bg-black/60 p-10 rounded-2xl backdrop-blur-md shadow-2xl max-w-2xl w-full space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Welcome to <span className="text-orange-400">Mess Management</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Plan your meals, buy coupons, and enjoy a seamless dining experience
            at IIIT Bhubaneswar.
          </p>
          <Link href="/sign-in">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-xl px-8 py-4 shadow-lg transition">
              Sign In to Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
