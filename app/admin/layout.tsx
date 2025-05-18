import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/userActions";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const user = await getUser({ clerkId: clerkUser?.id });

  if (!user || user.role !== "Admin") {
    redirect("/");
  }

  return <div className="mx-12">{children}</div>;
}
