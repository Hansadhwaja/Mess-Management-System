import UsersList from "@/components/admin/Users/UsersList";
import React from "react";

const AdminUsers = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Users
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Manage all registered users and their information.
          </p>
        </header>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <UsersList />
        </section>
      </div>
    </div>
  );
};

export default AdminUsers;
