import InfoItem from "@/components/admin/Orders/InfoItem";
import { getOrderById } from "@/lib/actions/orderActions";
import React from "react";

interface OrderCoupon{
day:string;
meals:string[]
}

type Params = Promise<{ id: string }>;

const OrderDetails = async (props: { params: Params }) => {
  const params = await props.params;
  const { order, coupons } = await getOrderById({ id: params.id });

  if (!order) {
    return (
      <div className="flex items-center justify-center text-gray-400 text-lg py-20">
        Order not found.
      </div>
    );
  }

  return (
    <div className="bg-black/50 backdrop-blur-2xl m-4 rounded-xl p-6 sm:p-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-white">
        Order Details
      </h1>

      <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-6 sm:p-10 border border-white/20 bg-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-10">
          <InfoItem label="Order ID" value={order._id.toString()} />
          <InfoItem label="User Name" value={order.userId.name} />
          <InfoItem label="Week" value={order.week} />
          <InfoItem label="Amount" value={`₹${order.amount}/-`} />
          <InfoItem
            label="Purchased At"
            value={new Date(order.createdAt).toLocaleString()}
            className="sm:col-span-2"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Coupons
          </h2>

          {coupons && coupons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {coupons.map((coupon: OrderCoupon) => (
                <div
                  key={coupon.day}
                  className="bg-white/10 text-white p-5 rounded-lg border border-white/20 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-lg font-bold mb-2">{coupon.day}</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {coupon.meals.map((meal: string, idx: number) => (
                      <li key={idx} className="capitalize">
                        {meal}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No coupons used for this order.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
