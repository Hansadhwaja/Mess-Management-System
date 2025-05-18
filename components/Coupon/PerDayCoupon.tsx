import { getMenuItems } from "@/lib/actions/menuActions";
import { MealType, MenuItem } from "@/types/types";
import React from "react";
import Card from "./Card";

interface PerDayCouponProps {
  meal: MealType[];
  day: string;
}

const PerDayCoupon = async ({ meal, day }: PerDayCouponProps) => {
  const menuItems = await getMenuItems();
  const todayMenu = menuItems.find((item: MenuItem) => item.day === day);

  return (
    <div className="flex flex-wrap gap-6 justify-start">
      {meal.map((mealType) => {
        const mealContent = todayMenu ? todayMenu[mealType] : "Not available";
        return (
          <Card
            key={mealType}
            meal={mealType}
            day={day}
            menuItem={mealContent}
          />
        );
      })}
    </div>
  );
};

export default PerDayCoupon;
