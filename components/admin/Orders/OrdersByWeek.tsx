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
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-10">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">
          Orders for <span className="text-gray-600">{week}</span>
        </h2>

        <Table
          className="text-base"
          style={{ borderCollapse: "separate", borderSpacing: "0 14px" }}
        >
          <TableHeader>
            <TableRow className="bg-gray-100 rounded-lg shadow-inner">
              <TableHead className="w-[80px] text-left text-gray-700 rounded-l-lg px-4 py-3 font-semibold">
                Image
              </TableHead>
              <TableHead className="text-left text-gray-700 font-semibold px-4 py-3">
                Name
              </TableHead>
              <TableHead className="text-left text-gray-700 font-semibold px-4 py-3">
                Email
              </TableHead>
              <TableHead className="text-left text-gray-700 font-semibold px-4 py-3">
                Amount (₹)
              </TableHead>
              <TableHead className="text-left text-gray-700 rounded-r-lg font-semibold px-4 py-3">
                View Details
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-500 italic"
                >
                  No orders found for this week.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow
                  key={order._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <TableCell className="px-4 py-3">
                    <Image
                      src={order.userId.image}
                      alt={`${order.userId.name} profile`}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 font-medium text-gray-900">
                    {order.userId.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 truncate max-w-[220px]">
                    {order.userId.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold text-gray-900">
                    ₹{order.amount}/-
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
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
  );
};

export default OrdersByWeek;
