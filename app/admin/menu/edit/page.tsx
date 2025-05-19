import MenuForm from "@/components/admin/Menu/MenuForm";
import { getMenuItems } from "@/lib/actions/menuActions";
import React from "react";

const EditMenu = async () => {
  const menuItems = await getMenuItems();
  const editedMenuItems = menuItems
    .map((item) => item._doc)
    .map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

  return (
    <div className="flex flex-col p-6">
      <MenuForm menuItems={editedMenuItems} />
    </div>
  );
};

export default EditMenu;
