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
  usedAt?: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (!used) {
      router.push(`qr-code?day=${day}&meal=${meal}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative w-72 rounded-2xl p-6 shadow-xl transition-transform ${
        used
          ? "bg-gray-300/10 border border-gray-500 cursor-not-allowed text-white/60"
          : "border border-white/20 text-white cursor-pointer hover:scale-105 hover:shadow-2xl"
      }`}
    >
      <div className="absolute top-4 right-4">
        <Utensils className="w-6 h-6 text-white/70" />
      </div>

      <h2 className="text-2xl font-bold capitalize mb-2 flex items-center gap-2">
        {meal}
        {used && (
          <span className="bg-red-600 px-2 py-0.5 rounded-full text-xs">
            Used
          </span>
        )}
      </h2>

      {usedAt && used && (
        <div className="text-xs text-white/70 mb-2">
          at{" "}
          {new Date(usedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}

      <p className="text-lg font-medium line-clamp-2 opacity-90">
        {menuItem || "No menu added yet."}
      </p>

      <div className="mt-6 text-sm text-white/80">{day}</div>
    </div>
  );
};

export default Card;
