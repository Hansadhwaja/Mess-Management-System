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
import { navItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center p-4 gap-4 shadow sticky top-0 bg-white z-10">
      <div>
        <Image src="/logo-white.png" alt="Logo" width={72} height={60} />
      </div>
      {isSignedIn && (
        <div className="flex gap-4">
          {navItems.map((item) => {
            const isActive = path === item.link;
            return (
              <Link
                href={item.link}
                key={item.name}
                className={`${
                  isActive ? "text-orange-500" : "text-gray-700"
                } hover:text-orange-500 transition-colors duration-200 font-semibold`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
      <SignedOut>
        <SignInButton>
          <Button className="rounded-full cursor-pointer">
            <User />
            <span>Sign In</span>
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
