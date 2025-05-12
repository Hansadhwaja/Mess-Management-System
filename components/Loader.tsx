import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="animate-spin flex justify-center items-center">
      <Loader2 className="h-16 w-16 text-orange-500" />
    </div>
  );
};

export default Loader;
