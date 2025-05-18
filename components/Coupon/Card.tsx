"use client";

import { MealType } from "@/types/types";
import React from "react";
import { useRouter } from "next/navigation";
import { Utensils } from "lucide-react";

const Card = ({
  meal,
  day,
  menuItem,
}: {
  meal: MealType;
  day: string;
  menuItem: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`qr-code?day=${day}&meal=${meal}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-72 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 p-6 text-white shadow-xl cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl"
    >
      <div className="absolute top-4 right-4 text-white/70">
        <Utensils className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold capitalize mb-2">{meal}</h2>
      <p className="text-lg font-medium line-clamp-2">
        {menuItem || "No menu added yet."}
      </p>
      <div className="mt-6 text-sm text-white/80">{day}</div>
    </div>
  );
};

export default Card;
