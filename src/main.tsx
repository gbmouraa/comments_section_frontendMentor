import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppProvider } from "../src/contexts/app-provider.tsx";
import { App } from "./app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
