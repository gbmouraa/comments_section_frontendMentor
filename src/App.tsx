import { SwitchTheme } from "./components/switch-theme";
import { Profiles } from "./components/profiles";
import { AppProvider } from "./contexts/providers/app-provider";
import { Posts } from "./components/posts-list";

export const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <div className="min-h-screen w-full bg-neutral-100 p-4 dark:bg-zinc-800 md:py-10">
          <div className="flex flex-wrap items-center justify-between gap-6 md:flex-nowrap md:items-start">
            <div className="order-0 min-w-[118px] md:-translate-y-5">
              <SwitchTheme />
            </div>
            <div className="order-2 mx-auto">
              <Posts />
            </div>
            <div className="order-1 md:order-2 md:-translate-y-5">
              <Profiles />
            </div>
          </div>
        </div>
      </AppProvider>
    </>
  );
};
