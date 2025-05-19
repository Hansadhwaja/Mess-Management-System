import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Time } from "@/types/types";

const TimeTable = ({ times = [] }: { times: Time[] }) => {
  if (times.length === 0) {
    return (
      <p className="text-center text-white italic mt-8">No timing available.</p>
    );
  }

  return (
    <div className="overflow-x-auto text-white">
      <Table className="w-full table-auto bg-transparent text-white">
        <TableHeader>
          <TableRow className="bg-transparent sticky top-0 z-10">
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-white select-none">
              Meal
            </TableHead>
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-white select-none">
              Time
            </TableHead>
            <TableHead className="px-6 py-3 text-left font-semibold tracking-wide uppercase text-white select-none">
              Cost (₹)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {times.map((item) => (
            <TableRow
              key={item._id}
              className="bg-transparent hover:bg-white/10 transition-colors cursor-default"
            >
              <TableCell className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.meal}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-normal text-white">
                {item.time}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-normal text-green-400 font-semibold">
                ₹{item.cost}/-
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TimeTable;
