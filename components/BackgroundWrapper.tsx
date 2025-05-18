"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function BackgroundWrapper() {
  const { user, isLoaded } = useUser();
  const [backgroundImage, setBackgroundImage] = useState("/guest-homepage.jpg");

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isLoaded && user) {
        const res = await fetch("/api/user/single-user", {
          method: "POST",
          body: JSON.stringify({ clerkId: user.id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (data.role === "Admin") {
          setBackgroundImage("/admin-homepage.jpg");
        } else if (data.role === "Student") {
          setBackgroundImage("/user-homepage.jpg");
        }
      }
    };

    fetchUserRole();
  }, [isLoaded, user]);

  return (
    <div
      className="fixed inset-0 -z-10 bg-cover bg-center bg-opacity-30"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
  );
}
