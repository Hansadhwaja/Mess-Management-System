import Hero from "@/components/admin/Dashboard/Hero";
import RecentOrders from "@/components/admin/Dashboard/RecentOrders";
import TodayMeal from "@/components/admin/Dashboard/TodayMeal";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const AdminDashboard = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  if (role !== "admin") return redirect("/onboarding");

  return (
    <div className="flex flex-col gap-8 min-h-screen px-4 py-6 lg:px-12 lg:py-10 bg-gray-50">
      <header className="w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage everything from one place</p>
      </header>

      <nav className="flex flex-wrap justify-center gap-4">
        <Link href="/admin/menu">
          <Button className="rounded-2xl px-6 py-2 shadow-md hover:shadow-lg transition">Manage Menu</Button>
        </Link>
        <Link href="/admin/orders">
          <Button className="rounded-2xl px-6 py-2 shadow-md hover:shadow-lg transition">Manage Orders</Button>
        </Link>
        <Link href="/admin/users">
          <Button className="rounded-2xl px-6 py-2 shadow-md hover:shadow-lg transition">Manage Users</Button>
        </Link>
      </nav>

      <main className="grid gap-8">
        <section className="bg-white rounded-2xl shadow p-6">
          <Hero />
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <TodayMeal />
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <RecentOrders />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
