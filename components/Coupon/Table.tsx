import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../ui/checkbox";
import { Meal, MealType } from "@/types/types";
import { useCouponStore } from "@/store/couponStore";

interface CouponTableProps {
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
  day: string;
}

const CouponTable = ({ breakfast, lunch, dinner, day }: CouponTableProps) => {
  const { selectedCoupons, toggleMeal, toggleMealsForDay } = useCouponStore();

  const allMeals: MealType[] = ["breakfast", "lunch", "dinner"];
  const selectedForDay = selectedCoupons.find((entry) => entry.day === day);
  const isAllSelected = selectedForDay
    ? allMeals.every((meal) => selectedForDay.meal.includes(meal))
    : false;

  const isMealSelected = (meal: MealType) =>
    selectedForDay?.meal.includes(meal) ?? false;

  const getRowClass = (meal: MealType) =>
    isMealSelected(meal) ? "bg-orange-100/20" : "hover:bg-white/5";

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full text-sm">
        <TableHeader>
          <TableRow className="bg-white/10 text-white">
            <TableHead className="w-12 text-center">
              <Checkbox
                className="border-white"
                checked={isAllSelected}
                onCheckedChange={(checked: boolean) => {
                  toggleMealsForDay(day, checked ? allMeals : []);
                }}
              />
            </TableHead>
            <TableHead className="text-white">Meal</TableHead>
            <TableHead className="text-white">Time</TableHead>
            <TableHead className="text-white">Cost</TableHead>
            <TableHead className="text-white">Items</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(["breakfast", "lunch", "dinner"] as MealType[]).map((mealType) => {
            const meal = { breakfast, lunch, dinner }[mealType];
            return (
              <TableRow key={mealType} className={getRowClass(mealType)}>
                <TableCell className="text-center">
                  <Checkbox
                    className="border-white"
                    checked={isMealSelected(mealType)}
                    onCheckedChange={() => toggleMeal(day, mealType)}
                  />
                </TableCell>
                <TableCell className="text-white">{meal?.type || "—"}</TableCell>
                <TableCell className="text-white">{meal?.time || "—"}</TableCell>
                <TableCell className="font-medium text-orange-500">
                  {meal?.cost ? `${meal.cost}/-` : "—"}
                </TableCell>
                <TableCell className="text-white">{meal?.items || "—"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponTable;
