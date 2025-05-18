"use client";

import React, { useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { User } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { navItems, adminNavItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCouponStore } from "@/store/couponStore";

const Header = () => {
  const path = usePathname();
  const { clearSelectedCoupons } = useCouponStore();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      clearSelectedCoupons();
    }
  }, [isSignedIn, clearSelectedCoupons]);

  const role = user?.publicMetadata?.role;
  const itemsToShow = role === "admin" ? adminNavItems : navItems;

  return (
    <header className="bg-black/50 backdrop-blur-sm sticky top-0 shadow-md z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/">
          <Image
            src="/logo-white.png"
            alt="Logo"
            width={72}
            height={60}
            className="object-contain"
          />
        </Link>
        {isSignedIn && (
          <nav className="hidden md:flex space-x-8">
            {itemsToShow.map((item) => {
              const isActive =
                path === item.link || path.startsWith(item.link + "/");
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`relative font-semibold text-white hover:text-orange-400 transition-colors duration-200 ${
                    isActive ? "text-orange-500" : ""
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 rounded" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full px-4 py-2 hover:text-orange-400 hover:border-orange-400 transition"
              >
                <User size={18} />
                <span className="hidden sm:inline">Sign in</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
