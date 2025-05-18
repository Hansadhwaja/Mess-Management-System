import { getOrders } from "@/lib/actions/orderActions";
import { getUsers } from "@/lib/actions/userActions";
import React from "react";

const Hero = async () => {
  const users = await getUsers();
  const orders = await getOrders();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-8 text-center transition hover:shadow-xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Total Users
        </h2>
        <p className="text-4xl font-bold text-blue-600">{users.length}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-8 text-center transition hover:shadow-xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Total Orders
        </h2>
        <p className="text-4xl font-bold text-green-600">{orders.length}</p>
      </div>
    </div>
  );
};

export default Hero;
