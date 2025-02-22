import React, { useEffect, useState } from "react";
import { AppContext } from "../app-context";
import { StoredAppType } from "@/types";
import { api } from "@/api";
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const storedData = localStorage.getItem("@postApp");
  const [storedApp, setStoredApp] = useState<StoredAppType>(() => {
    if (storedData) {
      return JSON.parse(storedData);
    }

    return {
      theme: "light",
      currentUser: {
        username: "juliusomo",
        image:
          "https://firebasestorage.googleapis.com/v0/b/auth-7e2b3.appspot.com/o/avatars%2Fimage-juliusomo.png?alt=media&token=a736a8b1-63d9-488d-8425-6302b62eee64",
      },
      posts: [],
    };
  });

  useEffect(() => {
    const getPosts = async () => {
      if (storedData) return;
      try {
        const response = await api.get(
          "https://api.npoint.io/ea3f650878adcbc9d32f",
        );
        const data = { ...storedApp, posts: response.data.comments };
        setStoredApp(data);
        localStorage.setItem("@postApp", JSON.stringify(data));
      } catch (error) {
        console.error(
          `Sorry, it was not possible to fetch the data now. Please try again later. ${error}`,
        );
      }
    };
    getPosts();
  }, []);

  return (
    <AppContext.Provider value={{ storedApp, setStoredApp }}>
      {children}
    </AppContext.Provider>
  );
};
