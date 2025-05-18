import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Onboarding = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const role = user.publicMetadata?.role;
  if (role === "admin") {
    return redirect("/admin/dashboard");
  } else {
    return redirect("/user/dashboard");
  }
};

export default Onboarding;
