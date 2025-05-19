import React from "react";
import { getOrdersForWeek } from "@/lib/actions/orderActions";
import { getFormattedWeek } from "@/lib/utils/getFormattedWeek";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

const OrdersByWeek = async () => {
  const week = getFormattedWeek();
  const orders = await getOrdersForWeek(week);

  return (
    <div className="flex justify-center items-start py-4">
      <div className="w-full max-w-7xl p-6 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 border-b border-white/20 pb-4">
          Orders for <span className="text-blue-400">{week}</span>
        </h2>

        <div className="overflow-x-auto">
          <Table
            className="text-sm sm:text-base w-full"
            style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
          >
            <TableHeader>
              <TableRow className="bg-white/10">
                <TableHead className="rounded-l-xl px-4 py-3 text-white">Image</TableHead>
                <TableHead className="px-4 py-3 text-white">Name</TableHead>
                <TableHead className="px-4 py-3 text-white">Email</TableHead>
                <TableHead className="px-4 py-3 text-white">Amount (₹)</TableHead>
                <TableHead className="rounded-r-xl px-4 py-3 text-white">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-gray-300 italic"
                  >
                    No orders found for this week.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order._id}
                    className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-lg transition duration-200"
                  >
                    <TableCell className="px-4 py-3">
                      <Image
                        src={order.userId.image}
                        alt={`${order.userId.name} profile`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border border-gray-400"
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-white font-medium">
                      {order.userId.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-300 truncate max-w-[220px]">
                      {order.userId.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-white font-semibold">
                      ₹{order.amount}/-
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="text-blue-400 hover:text-blue-600 underline"
                      >
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OrdersByWeek;
