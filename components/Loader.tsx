import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({ color }: { color: string }) => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Loader2 className={`h-8 w-8 text-${color} animate-spin`} />
    </div>
  );
};

export default Loader;
