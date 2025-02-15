import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export const ThemeAlternator: React.FC = () => {
  const [darkModeIsSelected, setDarkModeIsSelectd] = useState<boolean>(false);

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem("@theme");
      if (storedTheme && storedTheme === "dark") {
        handleChange(true);
      }
    };
    checkTheme();
  }, []);

  useEffect(() => {
    if (darkModeIsSelected) {
      localStorage.setItem("@theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("@theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkModeIsSelected]);

  const handleChange = (event: boolean) => {
    setDarkModeIsSelectd(event);
  };

  return (
    <div className="flex items-center gap-x-2">
      <Switch
        id="dark-mode"
        checked={darkModeIsSelected}
        onCheckedChange={(event) => handleChange(event)}
      />
      <Label htmlFor="dark-mode" className="text-slate-500">
        Dark Mode
      </Label>
    </div>
  );
};
