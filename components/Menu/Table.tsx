import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMenuItems } from "@/lib/actions/menuActions";

const MenuTable = async () => {
  const menuItems = await getMenuItems();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Day</TableHead>
          <TableHead>Breakfast</TableHead>
          <TableHead>Lunch</TableHead>
          <TableHead>Dinner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menuItems.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{item.day}</TableCell>
            <TableCell>{item.breakfast}</TableCell>
            <TableCell>{item.lunch}</TableCell>
            <TableCell>{item.dinner}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MenuTable;
