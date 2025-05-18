import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const features = [
  "Monitor and manage student orders",
  "View and export daily reports",
  "Maintain mess schedules and inventory",
];

const AdminHome = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
     

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-white text-center">
        <div className="bg-black/60 p-10 rounded-xl backdrop-blur-md shadow-2xl max-w-2xl w-full space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-blue-300">
            Welcome Admin
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Oversee and manage all mess operations seamlessly.
          </p>

          <Link href="/admin/orders">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition">
              Manage Orders
            </Button>
          </Link>

          <div className="mt-6 grid gap-4 text-left">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="text-green-400 w-6 h-6 mt-1" />
                <p className="text-base md:text-lg text-gray-100">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
