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
  const { selectedCoupons, toggleMeal, toggleMealsForDay } =
    useCouponStore();

  const allMeals: MealType[] = ["breakfast", "lunch", "dinner"];

  const selectedForDay = selectedCoupons.find((entry) => entry.day === day);
  const isAllSelected = selectedForDay
    ? allMeals.every((meal) => selectedForDay.meal.includes(meal))
    : false;

  const isMealSelected = (meal: MealType) =>
    selectedForDay?.meal.includes(meal) ?? false;

  const getRowClass = (meal: MealType) =>
    isMealSelected(meal) ? "bg-orange-50" : "";

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full mt-2 text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-12 text-center">
              <Checkbox
                className="border-gray-400"
                checked={isAllSelected}
                onCheckedChange={(checked: boolean) => {
                  toggleMealsForDay(day, checked ? allMeals : []);
                }}
              />
            </TableHead>
            <TableHead className="text-gray-700">Meal</TableHead>
            <TableHead className="text-gray-700">Time</TableHead>
            <TableHead className="text-gray-700">Cost</TableHead>
            <TableHead className="text-gray-700">Items</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className={getRowClass("breakfast")}>
            <TableCell className="text-center">
              <Checkbox
                className="border-gray-400"
                checked={isMealSelected("breakfast")}
                onCheckedChange={() => toggleMeal(day, "breakfast")}
              />
            </TableCell>
            <TableCell>{breakfast?.type || "—"}</TableCell>
            <TableCell>{breakfast?.time || "—"}</TableCell>
            <TableCell className="font-medium text-orange-600">
              {breakfast?.cost ? `${breakfast.cost}/-` : "—"}
            </TableCell>
            <TableCell>{breakfast?.items || "—"}</TableCell>
          </TableRow>

          <TableRow className={getRowClass("lunch")}>
            <TableCell className="text-center">
              <Checkbox
                className="border-gray-400"
                checked={isMealSelected("lunch")}
                onCheckedChange={() => toggleMeal(day, "lunch")}
              />
            </TableCell>
            <TableCell>{lunch?.type || "—"}</TableCell>
            <TableCell>{lunch?.time || "—"}</TableCell>
            <TableCell className="font-medium text-orange-600">
              {lunch?.cost ? `${lunch.cost}/-` : "—"}
            </TableCell>
            <TableCell>{lunch?.items || "—"}</TableCell>
          </TableRow>

          <TableRow className={getRowClass("dinner")}>
            <TableCell className="text-center">
              <Checkbox
                className="border-gray-400"
                checked={isMealSelected("dinner")}
                onCheckedChange={() => toggleMeal(day, "dinner")}
              />
            </TableCell>
            <TableCell>{dinner?.type || "—"}</TableCell>
            <TableCell>{dinner?.time || "—"}</TableCell>
            <TableCell className="font-medium text-orange-600">
              {dinner?.cost ? `${dinner.cost}/-` : "—"}
            </TableCell>
            <TableCell>{dinner?.items || "—"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponTable;
