import { AppContext } from "@/contexts/app-context";
import { useContext } from "react";

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useUser must be used inside of an UseProvider");
  }

  return context;
};
