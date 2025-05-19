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
    <div className="w-full mt-10 bg-transparent p-6 rounded-2xl shadow-md text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Recent Orders</h2>
        <Link href="/admin/orders">
          <Button className="rounded-xl bg-transparent border">View all orders</Button>
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <p className="text-center text-white/70 text-lg">No recent orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[600px] text-white">
            <TableHeader>
              <TableRow className="bg-transparent">
                <TableHead className="text-white">Image</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Week</TableHead>
                <TableHead className="text-white">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((item) => (
                <TableRow
                  key={item._id}
                  className="bg-transparent hover:bg-white/10 transition-colors duration-200"
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
                  <TableCell className="font-medium text-white">{item.userId.name}</TableCell>
                  <TableCell className="text-white">{item.userId.email}</TableCell>
                  <TableCell className="text-white">{item.week}</TableCell>
                  <TableCell className="font-semibold text-green-400">
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
