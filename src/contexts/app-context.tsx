import { createContext } from "react";
import { AppValueContext } from "@/types";

export const AppContext = createContext<AppValueContext | undefined>(undefined);
