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
      <p className="text-center text-white italic mt-8">
        No menu available.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto text-white">
      <Table className="w-full min-w-[600px] table-auto bg-transparent text-white">
        <TableHeader>
          <TableRow className="bg-transparent sticky top-0 z-10">
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-white select-none">
              Day
            </TableHead>
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-white select-none">
              Breakfast
            </TableHead>
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-white select-none">
              Lunch
            </TableHead>
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-white select-none">
              Dinner
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow
              key={item._id}
              className="bg-transparent hover:bg-white/10 transition-colors cursor-default"
            >
              <TableCell className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.day}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-normal text-white">
                {item.breakfast}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-normal text-white">
                {item.lunch}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-normal text-white">
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
