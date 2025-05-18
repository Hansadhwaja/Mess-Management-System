import WeeklyMenuForm from "@/components/admin/Menu/WeeklyMenuForm";
import React from "react";

const AddMenu = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 tracking-tight max-w-lg text-center">
        Add Menu
      </h1>
      <div className="w-full max-w-3xl">
        <WeeklyMenuForm />
      </div>
    </main>
  );
};

export default AddMenu;
