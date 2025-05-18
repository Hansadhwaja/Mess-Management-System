"use client";

import React from "react";
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

const Header = () => {
  const path = usePathname();
  const { isSignedIn, user } = useUser();

  const role = user?.publicMetadata?.role;
  const itemsToShow = role === "admin" ? adminNavItems : navItems;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Image
          src="/logo-white.png"
          alt="Logo"
          width={72}
          height={60}
          className="object-contain"
        />
        {isSignedIn && (
          <nav className="hidden md:flex space-x-8">
            {itemsToShow.map((item) => {
              const isActive =
                path === item.link || path.startsWith(item.link + "/");
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`relative font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 ${
                    isActive ? "text-orange-600" : ""
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-700 hover:text-orange-500 hover:border-orange-500 transition"
              >
                <User size={18} />
                <span className="hidden sm:inline">Sign in</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "w-10 h-10 rounded-full border border-gray-300",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
