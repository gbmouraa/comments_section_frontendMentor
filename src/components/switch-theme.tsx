import { useEffect, useState } from "react";
import { useApp } from "@/hooks/useApp";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export const SwitchTheme: React.FC = () => {
  const [darkModeIsSelected, setDarkModeIsSelected] = useState<boolean>(false);
  const { storedApp, setStoredApp } = useApp();

  useEffect(() => {
    if (storedApp?.theme === "dark") {
      const data = {
        ...storedApp,
        theme: "dark",
      };
      localStorage.setItem("@postApp", JSON.stringify(data));
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setDarkModeIsSelected(true);
    } else {
      const data = {
        ...storedApp,
        theme: "light",
      };
      localStorage.setItem("@postApp", JSON.stringify(data));
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      setDarkModeIsSelected(false);
    }
  }, [darkModeIsSelected]);

  const handleChange = (isActive: boolean) => {
    setDarkModeIsSelected(isActive);
    if (isActive) {
      setStoredApp((prev) => ({
        ...prev,
        theme: "dark",
      }));
    } else {
      setStoredApp((prev) => ({
        ...prev,
        theme: "light",
      }));
    }
  };

  return (
    <div className="mt-3 flex min-w-[118px] items-center gap-x-2 md:mt-0">
      <Switch
        id="dark-mode"
        checked={darkModeIsSelected}
        onCheckedChange={(event) => handleChange(event)}
      />
      <Label htmlFor="dark-mode" className="text-slate-500 dark:text-gray-200">
        Dark Mode
      </Label>
    </div>
  );
};
