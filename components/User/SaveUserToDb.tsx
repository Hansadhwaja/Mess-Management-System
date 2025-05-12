"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const SaveUserToDb = () => {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const syncUser = async () => {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            image: user.imageUrl,
          }),
        });
        if (response.ok) {
          console.log("User saved to database successfully");
        }
      };

      syncUser();
    }
  }, [isSignedIn, user]);

  return null;
};

export default SaveUserToDb;
