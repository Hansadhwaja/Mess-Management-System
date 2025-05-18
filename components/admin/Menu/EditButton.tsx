import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquarePen } from "lucide-react";

const EditButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/admin/menu/edit"
            className="
              inline-flex items-center justify-center
              rounded-md border border-indigo-600
              px-4 py-2 text-indigo-600 font-semibold
              hover:bg-indigo-600 hover:text-white
              transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
            "
            aria-label="Edit Menu"
          >
            <SquarePen className="w-5 h-5 mr-2" />
            Edit Menu
          </Link>
        </TooltipTrigger>

        <TooltipContent className="bg-gray-900 text-white rounded-md px-3 py-1 text-sm shadow-lg">
          Edit today&apos;s menu
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditButton;
