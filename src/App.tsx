import { useEffect } from "react";
import { SwitchTheme } from "./components/switch-theme";
import { Profiles } from "./components/profiles";
import { UserProvider } from "./contexts/comment-section-context";

export function App() {
  useEffect(() => {
    const applyTheme = () => {
      const storedTheme = localStorage.getItem("@theme");
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        if (storedTheme !== "light") {
          localStorage.setItem("@theme", "dark");
        }
      }
    };
    applyTheme();
  }, []);

  return (
    <>
      <UserProvider>
        <div className="min-h-screen w-full bg-slate-100 p-4 dark:bg-zinc-800">
          <div className="flex justify-between">
            <SwitchTheme />
            <Profiles />
            {/* Comments */}
          </div>
        </div>
      </UserProvider>
    </>
  );
}
