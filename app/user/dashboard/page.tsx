import React from "react";
import PendingPurchase from "@/components/Coupon/PendingPurchase";
import MenuTable from "@/components/Menu/Table";
import { getFormattedWeek } from "@/lib/utils/getFormattedWeek";
import { getMenuItems } from "@/lib/actions/menuActions";

const UserDashboard = async () => {
  const week = getFormattedWeek();
  const menuItems = await getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-10">
        <PendingPurchase />
      </div>

      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-sm">
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Weekly Menu for{" "}
            <span className="font-semibold text-xl text-orange-600 underline">
              {week}
            </span>
          </p>
          <h1 className="text-3xl font-bold mt-2 text-gray-900">
            This Week&apos;s Menu
          </h1>
        </div>

        <MenuTable menuItems={menuItems} />
      </div>
    </div>
  );
};

export default UserDashboard;
