"use client";

import React, { startTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { deleteAllMenus } from "@/lib/actions/menuActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteAllTimings } from "@/lib/actions/timeActions";

const DeleteButton = ({ type = "menu" }: { type?: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const response =
      type === "menu" ? await deleteAllMenus() : await deleteAllTimings();
    if (response.status === 200) {
      toast.success(response.message);
      router.refresh();
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="inline-flex items-center gap-2 rounded-md border border-red-500 px-4 py-2 text-red-600 font-semibold 
                   hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition"
        aria-label="Delete Menu"
      >
        <Trash2 className="w-5 h-5" />
        <span className="hidden sm:flex">Delete All</span>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-sm rounded-lg bg-black/10 backdrop-blur-2xl shadow-2xl border border-gray-200 p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-red-500">
            Confirm Permanent Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-3 text-gray-100 text-base leading-relaxed">
            This action{" "}
            <span className="font-semibold text-red-500">
              cannot be undone.
            </span>
            It will permanently delete all{" "}
            {type === "menu" ? "menus" : "menu timing"}. Students will no longer
            see weekly meal {type === "time" && " timing"}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8 flex justify-end gap-4">
          <AlertDialogCancel
            className="rounded-md border border-gray-300 bg-white px-5 py-2 text-gray-700 
                       hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <button
              onClick={() => startTransition(() => handleDelete())}
              className="rounded-md bg-red-600 px-5 py-2 text-white font-semibold 
                         hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
            >
              Delete Now
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
