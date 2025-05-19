"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { useUser } from "@clerk/nextjs";
import { adminNavItems, navItems } from "@/constants";

const BottomNav = () => {
  const path = usePathname();
  const { isSignedIn, user } = useUser();
  const role = user?.publicMetadata?.role;

  const itemsToShow = role === "admin" ? adminNavItems : navItems;
  if(!isSignedIn) return ;

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-sm border-t border-gray-700 flex justify-around items-center py-2 md:hidden">
      {itemsToShow.map(({ name, icon: Icon, link }) => {
        const isActive = path === link || path.startsWith(link + "/");
        return (
          <Link
            key={name}
            href={link}
            className={`flex flex-col items-center justify-center text-sm ${
              isActive ? "text-orange-400" : "text-white"
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] mt-1">{name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
