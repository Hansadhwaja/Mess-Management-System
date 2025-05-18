import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/lib/actions/userActions";
import UserHome from "@/components/home/UserHome";
import AdminHome from "@/components/home/AdminHome";
import GuestHome from "@/components/home/GuestHome";

export default async function HomePage() {
  const clerkUser = await currentUser();

  let role = null;
  if (clerkUser) {
    const user = await getUser({ clerkId: clerkUser.id });
    role = user?.role;
  }

  if (role === "Admin") return <AdminHome />;
  else if (role === "Student") return <UserHome />;
  return <GuestHome />;
}
