import PendingPurchase from "@/components/Coupon/PendingPurchase";
import MenuTable from "@/components/Menu/Table";
import { getFormattedWeek } from "@/lib/utils/getFormattedWeek";

export default function Home() {
  const week = getFormattedWeek();
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <PendingPurchase />
      <p className="text-left w-full my-8">
        Weekly Menu for{" "}
        <span className="font-semibold text-xl underline">{week}</span>
      </p>
      <h1 className="text-3xl font-bold mb-4">Menu Items</h1>
      <MenuTable />
    </div>
  );
}
