import { getMenuItems } from "@/lib/actions/menuActions";
import { CouponMeal, MenuItem } from "@/types/types";
import React from "react";
import Card from "./Card";

interface PerDayCouponProps {
  meals: CouponMeal[];
  day: string;
}

const PerDayCoupon = async ({ meals, day }: PerDayCouponProps) => {
  const menuItems = await getMenuItems();
  const todayMenu = menuItems.find((item: MenuItem) => item.day === day);

  return (
    <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
      {meals.map((mealType: CouponMeal) => {
        const mealContent = todayMenu ? todayMenu[mealType.meal] : null;
        const menuItemDescription = mealContent ? mealContent : "Not available";

        return (
          <Card
            key={mealType.id}
            meal={mealType.meal}
            day={day}
            menuItem={menuItemDescription}
            used={mealType.used}
            usedAt={mealType.usedAt}
          />
        );
      })}
    </div>
  );
};

export default PerDayCoupon;
