import { getMenuItems } from "@/lib/actions/menuActions";
import { MealType, MenuItem } from "@/types/types";
import React from "react";
import Card from "./Card";

const PerDayCoupon = async ({
  meal,
  day,
}: {
  meal: MealType[];
  day: string;
}) => {
  const menu = await getMenuItems();
  return (
    <div className="flex gap-8 flex-wrap items-center">
      {meal.map((meal) => {
        const menuItem = menu.find((item: MenuItem) => item.day === day);
        return (
          <Card
            key={meal}
            meal={meal}
            day={day}
            menuItem={menuItem ? menuItem[meal] : ""}
          />
        );
      })}
    </div>
  );
};

export default PerDayCoupon;
