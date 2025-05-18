import { getRecentOrders } from "@/lib/actions/orderActions";
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
import Image from "next/image";

const RecentOrders = async () => {
  const recentOrders = await getRecentOrders();

  return (
    <div className="w-full mt-10 bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
        <Link href="/admin/orders">
          <Button className="rounded-xl">View all orders</Button>
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No recent orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Week</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((item) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell>
                    <Image
                      src={item.userId.image}
                      alt="profile_picture"
                      width={36}
                      height={36}
                      className="rounded-full object-cover border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.userId.name}</TableCell>
                  <TableCell>{item.userId.email}</TableCell>
                  <TableCell>{item.week}</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    ₹{item.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
