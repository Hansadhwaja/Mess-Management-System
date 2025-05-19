import Hero from "@/components/admin/Dashboard/Hero";
import RecentOrders from "@/components/admin/Dashboard/RecentOrders";
import TodayMeal from "@/components/admin/Dashboard/TodayMeal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AdminDashboard = async () => {
  return (
    <div className="flex flex-col flex-wrap px-4 py-6 md:px-8 lg:px-12 lg:py-10 bg-black/60 backdrop-blur-2xl m-4 rounded-md">
      <div className="w-full text-center mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-200 mt-1">
          Manage everything from one place
        </p>
      </div>
      <div className="flex flex-wrap w-full justify-center gap-4 mb-8 text-sm">
        <Link href="/admin/menu">
          <Button className="rounded-2xl px-6 py-2 shadow-md hover:shadow-lg transition border bg-transparent">
            Manage Menu
          </Button>
        </Link>
        <Link href="/admin/orders">
          <Button className="w-full sm:w-auto rounded-2xl px-6 py-2 shadow-md hover:shadow-lg transition border bg-transparent">
            Manage Orders
          </Button>
        </Link>
        <Link href="/admin/users">
          <Button className="w-full sm:w-auto rounded-2xl px-6 py-2 shadow-md hover:shadow-lg transition border bg-transparent">
            Manage Users
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-6 md:gap-8 w-full">
        <Hero />
        <TodayMeal />
        <RecentOrders />
      </div>
    </div>
  );
};

export default AdminDashboard;
