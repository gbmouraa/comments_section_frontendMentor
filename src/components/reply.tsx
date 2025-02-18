import { Button } from "./ui/button";

export const Reply: React.FC = () => {
  return (
    <div className="md:absolute md:right-6 md:top-6">
      <Button
        variant="ghost"
        className="shadow-none transition-all hover:bg-transparent hover:opacity-70"
      >
        <img
          src="https://frontendmentor-showcase.netlify.app/static/media/icon-reply.bfb4589d45cd96abd45e3b82f7e7bbc6.svg"
          alt="Reply icon"
        />
        <span className="text-indigo-400">Reply</span>
      </Button>
    </div>
  );
};
