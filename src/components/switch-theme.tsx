import { useEffect, useState } from "react";
import { useApp } from "@/hooks/useApp";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export const SwitchTheme: React.FC = () => {
  const [darkModeIsSelected, setDarkModeIsSelected] = useState<boolean>(false);
  const { storedApp, changeStoredApp } = useApp();

  useEffect(() => {
    if (storedApp?.theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setDarkModeIsSelected(true);
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      setDarkModeIsSelected(false);
    }
  }, [darkModeIsSelected]);

  const handleChange = (isActive: boolean) => {
    setDarkModeIsSelected(isActive);
    if (isActive) {
      changeStoredApp("theme", "dark");
    } else {
      changeStoredApp("theme", "light");
    }
  };

  return (
    <div className="left-4 top-4 z-10 mt-3 flex w-fit items-center gap-x-2 md:mt-0 xl:fixed">
      <Switch
        id="dark-mode"
        checked={darkModeIsSelected}
        onCheckedChange={(event) => handleChange(event)}
      />
      <Label
        htmlFor="dark-mode"
        className="cursor-pointer text-slate-500 dark:text-gray-200"
      >
        Dark Mode
      </Label>
    </div>
  );
};
