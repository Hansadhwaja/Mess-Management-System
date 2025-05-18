import MenuForm from "@/components/admin/Menu/MenuForm";
import { getMenuItems } from "@/lib/actions/menuActions";
import React from "react";

const EditMenu = async () => {
  const menuItems = await getMenuItems();
  const editedMenuItems = menuItems
    .map(item => item._doc)
    .map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

  return (
    <div className="flex flex-col p-6">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Menu</h1>
        <MenuForm menuItems={editedMenuItems} />
      </div>
    </div>
  );
};

export default EditMenu;
