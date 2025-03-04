import { useApp } from "./hooks/useApp";
import { SwitchTheme } from "./components/switch-theme";
import { Profiles } from "./components/profiles";
import { Posts } from "./components/posts-list";
import { Loader } from "./components/loader";

export const App: React.FC = () => {
  const { isLoading } = useApp();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen w-full bg-neutral-100 p-4 dark:bg-zinc-800">
          <SwitchTheme />
          <Posts />
          <Profiles />
        </div>
      )}
    </>
  );
};
