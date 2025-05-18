import CheckoutList from "@/components/Checkout/List";
import { getTimes } from "@/lib/actions/timeActions";
import React from "react";

const Checkout = async () => {
  const times = await getTimes();
  const timeOptions = times.map((time) => ({
    meal: time.meal,
    cost: time.cost,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
          Checkout
        </h1>
        <CheckoutList timeOptions={timeOptions} />
      </div>
    </div>
  );
};

export default Checkout;
