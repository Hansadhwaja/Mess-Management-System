import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getUsers } from "@/lib/actions/userActions";

const UsersList = async () => {
  const users = await getUsers();

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm p-6">
      <Table className="min-w-full text-base">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[80px] text-left text-gray-600 uppercase tracking-wide font-medium">
              Image
            </TableHead>
            <TableHead className="text-left text-gray-600 uppercase tracking-wide font-medium">
              Name
            </TableHead>
            <TableHead className="text-left text-gray-600 uppercase tracking-wide font-medium">
              Email
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              className="hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
            >
              <TableCell className="py-3">
                <Image
                  src={user.image}
                  alt={`${user.name} profile`}
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-300"
                />
              </TableCell>
              <TableCell className="py-3 text-gray-900 font-semibold">
                {user.name}
              </TableCell>
              <TableCell className="py-3 text-gray-700 truncate max-w-xs">
                {user.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
