import MenuTable from "@/components/Menu/Table";
import React from "react";
import EditButton from "@/components/admin/Menu/EditButton";
import DeleteButton from "@/components/admin/Menu/DeleteButton";
import { getMenuItems } from "@/lib/actions/menuActions";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminMenu = async () => {
  const menuItems = await getMenuItems();

  return (
    <div className="flex flex-col px-6 py-8 bg-black/50 backdrop-blur-2xl m-4 rounded-md">
      <div className="flex justify-between items-center mb-10 border-b border-gray-300 pb-4">
        <h1 className="text-xl sm:text-3xl font-semibold text-white">
          Manage Menu
        </h1>

        <div className="flex gap-4">
          {menuItems.length === 0 ? (
            <Link href="/admin/menu/add">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors">
                <Plus className="w-5 h-5" />
                <span>Add Menu</span>
              </Button>
            </Link>
          ) : (
            <>
              <EditButton />
              <DeleteButton />
            </>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-md p-6 bg-transparent">
        {menuItems.length > 0 ? (
          <MenuTable menuItems={menuItems} />
        ) : (
          <div className="text-center text-gray-600 text-lg py-12 italic">
            No menu items available. Click Add Menu to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
