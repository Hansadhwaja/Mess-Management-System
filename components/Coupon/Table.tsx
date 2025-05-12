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

  return (
    <Table className="w-full mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox
              className="border border-black"
              checked={isAllSelected}
              onCheckedChange={(checked: boolean) => {
                toggleMealsForDay(day, checked ? allMeals : []);
              }}
            />
          </TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Rs</TableHead>
          <TableHead>Items</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            <Checkbox
              className="border border-black"
              checked={isMealSelected("breakfast")}
              onCheckedChange={() => toggleMeal(day, "breakfast")}
            />
          </TableCell>
          <TableCell>{breakfast?.type}</TableCell>
          <TableCell>{breakfast?.time}</TableCell>
          <TableCell className="font-semibold">{breakfast?.cost}/-</TableCell>
          <TableCell>{breakfast?.items}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <Checkbox
              className="border border-black"
              checked={isMealSelected("lunch")}
              onCheckedChange={() => toggleMeal(day, "lunch")}
            />
          </TableCell>
          <TableCell>{lunch?.type}</TableCell>
          <TableCell>{lunch?.time}</TableCell>
          <TableCell className="font-semibold">{lunch?.cost}/-</TableCell>
          <TableCell>{lunch?.items}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <Checkbox
              className="border border-black"
              checked={isMealSelected("dinner")}
              onCheckedChange={() => toggleMeal(day, "dinner")}
            />
          </TableCell>
          <TableCell>{dinner?.type}</TableCell>
          <TableCell>{dinner?.time}</TableCell>
          <TableCell className="font-semibold">{dinner?.cost}/-</TableCell>
          <TableCell>{dinner?.items}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CouponTable;
