import React, { useEffect, useState } from "react";
import { AppContext } from "../app-context";
import { StoredAppType } from "@/types";
import { isEditingType } from "@/types";
import { api } from "@/api";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<isEditingType>({
    active: false,
    postID: null,
  });

  const [storedApp, setStoredApp] = useState<StoredAppType>(() => {
    const storedData = localStorage.getItem("@postApp");
    if (storedData) {
      return JSON.parse(storedData);
    }

    return {
      // this property serves as a flag so that data is not fetched unnecessarily
      // you can see the usage in useEffect
      alreadyStored: false,
      theme: "dark",
      currentUser: {
        username: "juliusomo",
        image:
          "https://firebasestorage.googleapis.com/v0/b/auth-7e2b3.appspot.com/o/avatars%2Fimage-juliusomo.png?alt=media&token=a736a8b1-63d9-488d-8425-6302b62eee64",
      },
      posts: [],
    };
  });

  // only to show loading animation '-'
  const delay = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const getPosts = async () => {
      if (storedApp.alreadyStored) {
        delay();
        return;
      }

      try {
        const response = await api.get(
          "https://api.npoint.io/8e4dc755152838e6e772",
        );

        let data = {
          ...storedApp,
          posts: response.data.comments,
          alreadyStored: true,
        };
        setStoredApp(data);
        localStorage.setItem("@postApp", JSON.stringify(data));
      } catch (error) {
        console.error(
          `Sorry, it was not possible to fetch the data now. Please try again later. ${error}`,
        );
      } finally {
        delay();
      }
    };
    getPosts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        storedApp,
        setStoredApp,
        isLoading,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
