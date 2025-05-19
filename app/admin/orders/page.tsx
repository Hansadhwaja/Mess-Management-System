import OrdersByWeek from "@/components/admin/Orders/OrdersByWeek";
import React from "react";

const AdminOrders = () => {
  return (
    <main className="bg-black/50 backdrop-blur-2xl m-4 rounded-xl py-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-100 mb-8">
        Orders
      </h1>
      <section className="w-full max-w-6xl bg-transparent">
        <OrdersByWeek />
      </section>
    </main>
  );
};

export default AdminOrders;
