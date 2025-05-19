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
    <div className="w-full overflow-x-auto rounded-xl border border-gray-300 shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">All Users</h2>

      <Table className="min-w-full text-base">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] text-left text-gray-300 uppercase tracking-wide font-semibold">
              Image
            </TableHead>
            <TableHead className="text-left text-gray-300 uppercase tracking-wide font-semibold">
              Name
            </TableHead>
            <TableHead className="text-left text-gray-300 uppercase tracking-wide font-semibold">
              Email
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              className="hover:bg-white/10 transition duration-150"
            >
              <TableCell className="py-4">
                <Image
                  src={user.image}
                  alt={`${user.name || "User"} profile`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </TableCell>
              <TableCell className="py-4 text-gray-100 font-medium">
                {user.name || (
                  <span className="italic text-gray-400">No name</span>
                )}
              </TableCell>
              <TableCell className="py-4 text-gray-300 max-w-xs truncate">
                {user.email || (
                  <span className="italic text-gray-400">No email</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
