import OrdersByWeek from "@/components/admin/Orders/OrdersByWeek";
import React from "react";

const AdminOrders = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Orders
      </h1>
      <section className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-6">
        <OrdersByWeek />
      </section>
    </main>
  );
};

export default AdminOrders;
