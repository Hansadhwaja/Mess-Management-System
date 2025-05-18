"use client";

import { MealType } from "@/types/types";
import React from "react";
import { useRouter } from "next/navigation";
import { Utensils } from "lucide-react";

const Card = ({
  meal,
  day,
  menuItem,
  used,
  usedAt,
}: {
  meal: MealType;
  day: string;
  menuItem: string;
  used?: boolean;
  usedAt?: string | undefined;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`qr-code?day=${day}&meal=${meal}`);
  };

  return (
    <div
      onClick={!used ? handleClick : undefined}
      className={`group relative w-72 rounded-2xl p-6 text-white shadow-xl cursor-pointer transition-transform ${
        used
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-br from-orange-500 to-orange-400 hover:scale-105 hover:shadow-2xl"
      }`}
    >
      <div className="absolute top-4 right-4 text-white/70">
        <Utensils className="w-6 h-6" />
      </div>

      <h2 className="text-2xl font-bold capitalize mb-2">
        {meal}{" "}
        {used && (
          <div className="ml-2 flex flex-col text-xs text-white/90">
            <span className="bg-red-600 px-2 py-0.5 rounded-full w-fit">
              Used
            </span>
            {usedAt && (
              <span className="mt-1">
                at{" "}
                {new Date(usedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        )}
      </h2>

      <p className="text-lg font-medium line-clamp-2 opacity-90">
        {menuItem || "No menu added yet."}
      </p>

      <div className="mt-6 text-sm text-white/80">{day}</div>
    </div>
  );
};

export default Card;
