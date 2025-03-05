import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";
import { useApp } from "@/hooks/useApp";

interface VotingButtonProps {
  score: number;
  user: string;
}

export const VotingButton: React.FC<VotingButtonProps> = ({
  score,
  user,
}: VotingButtonProps) => {
  const [votes, setVotes] = useState<number>(score);
  const { storedApp, setStoredApp } = useApp();

  const incrementVote = () => {
    setVotes((prev) => prev + 1);
  };

  const decrementVote = () => {
    setVotes((prev) => prev - 1);
  };

  return (
    <div
      className={`flex items-center overflow-hidden rounded-xl bg-neutral-100 dark:bg-zinc-800 md:absolute md:top-5 md:flex-col ${storedApp?.currentUser?.username === user && "cursor-not-allowed"}`}
    >
      <Button
        variant="ghost"
        className="w-full px-3 py-5 text-indigo-300 shadow-none hover:bg-transparent hover:text-indigo-500"
        onClick={incrementVote}
        disabled={storedApp?.currentUser?.username === user}
      >
        <Plus />
      </Button>
      <span className="font-medium text-indigo-400">{votes}</span>
      <Button
        variant="ghost"
        className="w-full px-3 py-5 text-indigo-300 hover:bg-transparent hover:text-indigo-500"
        onClick={decrementVote}
        disabled={storedApp?.currentUser?.username === user}
      >
        <Minus />
      </Button>
    </div>
  );
};
