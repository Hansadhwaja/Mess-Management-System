import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="animate-spin flex justify-center items-center">
      <Loader2 className="h-8 w-8" />
    </div>
  );
};

export default Loader;
