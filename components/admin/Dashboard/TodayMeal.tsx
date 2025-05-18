import { getTodaysMenu } from "@/lib/actions/menuActions";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TodayMeal = async () => {
  const todayMenu = await getTodaysMenu();

  const items = [
    {
      meal: "Breakfast",
      items: todayMenu?.breakfast || "Not Available",
    },
    {
      meal: "Lunch",
      items: todayMenu?.lunch || "Not Available",
    },
    {
      meal: "Dinner",
      items: todayMenu?.dinner || "Not Available",
    },
  ];

  return (
    <div className="w-full mt-10 bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Today&apos;s Menu</h2>
        <Link href="/admin/menu">
          <Button className="rounded-xl">Update Menu</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[400px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg text-gray-600">Meal</TableHead>
              <TableHead className="text-lg text-gray-600">Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.meal}>
                <TableCell className="font-semibold uppercase">{item.meal}</TableCell>
                <TableCell>{item.items}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TodayMeal;
