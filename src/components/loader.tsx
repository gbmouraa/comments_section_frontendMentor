import { useApp } from "@/hooks/useApp";
export const Loader = () => {
  const { storedApp } = useApp();

  return (
    <div
      className={`flex min-h-screen w-full items-center ${storedApp?.theme === "light" ? "bg-neutral-100" : "bg-zinc-800"}`}
    >
      <ul className="spinner">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
