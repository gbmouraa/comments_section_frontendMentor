import { UserContext } from "@/contexts/comment-section-context";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside of an UseProvider");
  }

  return context;
};
