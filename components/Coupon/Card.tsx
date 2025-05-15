"use client";

import { MealType } from "@/types/types";
import React from "react";
import { useRouter } from "next/navigation";

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
      className="flex flex-col shadow-2xl items-center p-4 bg-gradient-to-r from-orange-500 to-orange-300 w-[300px] rounded-xl justify-between min-h-36 hover:cursor-pointer"
      onClick={handleClick}
    >
      <h1 className="font-semibold capitalize text-xl">{meal}</h1>
      <p className="font-semibold">{menuItem}</p>
    </div>
  );
};

export default Card;
