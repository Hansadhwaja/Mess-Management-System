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
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Checkout</h1>
      <CheckoutList timeOptions={timeOptions} />
    </div>
  );
};

export default Checkout;
