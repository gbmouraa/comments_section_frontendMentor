import { useEffect } from "react";
import { ThemeAlternator } from "./components/theme-alternator";

export function App() {
  useEffect(() => {
    const applyTheme = () => {
      const storedTheme = localStorage.getItem("@theme");
      if (storedTheme && storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        localStorage.setItem("@theme", "light");
      }
    };
    applyTheme();
  }, []);

  return (
    <>
      <div className="p-4">
        <ThemeAlternator />
        {/* Profiles */}
        {/* Comments */}
      </div>
    </>
  );
}
