import { getOrderById } from "@/lib/actions/orderActions";
import { Coupon } from "@/types/types";
import React from "react";

const OrderDetails = async ({ params }: { params: { id: string } }) => {
  const order = await getOrderById({ id: params.id });

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Order not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Order Details
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-8">
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Coupons
          </h2>
          {order.coupons && order.coupons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {order.coupons.map((coupon: Coupon) => (
                <div
                  key={coupon._id}
                  className="bg-gray-100 rounded-lg p-5 border border-gray-300 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {coupon.day}
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {coupon.meal.map((meal: string, idx: number) => (
                      <li key={idx} className="capitalize">
                        {meal}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No coupons used</p>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col ${className}`}>
    <span className="text-gray-500 uppercase text-xs tracking-wide">
      {label}
    </span>
    <span className="mt-1 text-gray-900 font-medium break-words">
      {value}
    </span>
  </div>
);

export default OrderDetails;
