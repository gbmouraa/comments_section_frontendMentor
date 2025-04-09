import { ReactNode, useEffect, useState } from "react";
import {
  AppContext,
  IsReplyingProps,
  StoredAppData,
  isEditingProps,
  isLoading,
} from "./app-context";
import { api } from "@/api";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isLoading, setIsLoading] = useState<isLoading>(true);
  const [isReplying, setIsReplying] = useState<IsReplyingProps>({
    active: false,
    replyingToCommentID: null,
    usernames: null,
  });
  const [isEditing, setIsEditing] = useState<isEditingProps>({
    active: false,
    postID: null,
  });

  const [storedApp, setStoredApp] = useState<StoredAppData>(() => {
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

  // only to show loading animation
  const delay = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    localStorage.setItem("@postApp", JSON.stringify(storedApp));
  }, [storedApp]);

  // fetch data
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

  const changeStoredApp = (key: string, value: any) => {
    setStoredApp((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const changeIsEditing = (active: boolean, id: number | null) => {
    setIsEditing({ active: active, postID: id });
  };

  const changeIsReplying = (
    active: boolean,
    id: number | null,
    usernames: string[] | null,
  ) => {
    setIsReplying({
      active: active,
      replyingToCommentID: id,
      usernames: usernames,
    });
  };

  return (
    <AppContext.Provider
      value={{
        storedApp,
        changeStoredApp,
        isLoading,
        isEditing,
        changeIsEditing,
        isReplying,
        changeIsReplying,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
