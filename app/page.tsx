import MenuTable from "@/components/Menu/Table";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Menu Items</h1>
      <MenuTable />
    </div>
  );
}
