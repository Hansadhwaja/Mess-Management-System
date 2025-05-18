import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/userActions";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const user = await getUser({ clerkId: clerkUser?.id });

  if (!user || user.role !== "Student") {
    redirect("/");
  }

  return <div className="bg-transparent">{children}</div>;
}
