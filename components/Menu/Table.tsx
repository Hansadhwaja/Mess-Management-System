import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditedMenuItem } from "@/types/types";

const MenuTable = ({ menuItems = [] }: { menuItems: EditedMenuItem[] }) => {
  if (menuItems.length === 0) {
    return (
      <p className="text-center text-gray-400 italic mt-8">
        No menu available.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[600px] table-auto text-gray-900">
        <TableHeader>
          <TableRow className="bg-gray-50 sticky top-0 z-10 shadow-sm">
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-gray-600 select-none">
              Day
            </TableHead>
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-gray-600 select-none">
              Breakfast
            </TableHead>
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-gray-600 select-none">
              Lunch
            </TableHead>
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-gray-600 select-none">
              Dinner
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item, idx) => (
            <TableRow
              key={item._id}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition-colors cursor-default`}
            >
              <TableCell className="px-6 py-4 font-medium whitespace-nowrap">
                {item.day}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-normal">
                {item.breakfast}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-normal">
                {item.lunch}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-normal">
                {item.dinner}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenuTable;
