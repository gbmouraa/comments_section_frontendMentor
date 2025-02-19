import React, { createContext, useState } from "react";

export type CurrentUser = {
  id: number;
  username: string;
};

type ContextUserValue = {
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

export const UserContext = createContext<ContextUserValue | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>({
    id: 1,
    username: "amyrobson",
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
