import React from "react";
import PendingPurchase from "@/components/Coupon/PendingPurchase";
import MenuTable from "@/components/Menu/Table";
import { getFormattedWeek } from "@/lib/utils/getFormattedWeek";
import { getMenuItems } from "@/lib/actions/menuActions";

const UserDashboard = async () => {
  const week = getFormattedWeek();
  const menuItems = await getMenuItems();

  return (
    <div className="py-10 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-10">
        <PendingPurchase />
      </div>

      <div className="w-full max-w-4xl bg-black/50 backdrop-blur-2xl p-6 rounded-xl shadow-sm">
        <div className="mb-6">
          <p className="text-gray-100  text-sm sm:text-lg">
            Weekly Menu for{" "}
            <span className="font-semibold  text-[16px] sm:text-xl text-orange-500 underline">
              {week}
            </span>
          </p>
          <h1 className=" sm:text-xl md:text-3xl font-bold mt-2 text-white">
            This Week&apos;s Menu
          </h1>
        </div>

        <MenuTable menuItems={menuItems} />
      </div>
    </div>
  );
};

export default UserDashboard;
