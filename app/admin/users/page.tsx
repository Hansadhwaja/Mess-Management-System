import UsersList from "@/components/admin/Users/UsersList";
import React from "react";

const AdminUsers = () => {
  return (
    <div className="bg-black/50 backdrop-blur-2xl m-4 rounded-xl py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-gray-100 tracking-tight">
            Users
          </h1>
          <p className="mt-2 text-gray-200 text-lg">
            Manage all registered users and their information.
          </p>
        </header>

        <section className="border rounded-lg shadow-lg">
          <UsersList />
        </section>
      </div>
    </div>
  );
};

export default AdminUsers;
