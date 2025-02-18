import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";

interface CommentVotingButtonProps {
  score: number;
}

export const CommentVotingButton: React.FC<CommentVotingButtonProps> = ({
  score,
}: CommentVotingButtonProps) => {
  const [votes, setVotes] = useState<number>(score);

  // increment e decrement irão receber os dados do usuario antes do voto ser feito
  const incrementVote = () => {
    setVotes((prev) => prev + 1);
  };

  const decrementVote = () => {
    setVotes((prev) => prev - 1);
  };

  return (
    <div className="flex items-center overflow-hidden rounded-xl bg-neutral-100 dark:bg-zinc-800 md:absolute md:top-5 md:flex-col">
      <Button
        variant="ghost"
        className="w-full px-3 py-5 text-indigo-300 shadow-none hover:bg-transparent hover:text-indigo-500"
        onClick={incrementVote}
      >
        <Plus />
      </Button>
      <span className="font-medium text-indigo-400">{votes}</span>
      <Button
        variant="ghost"
        className="w-full px-3 py-5 text-indigo-300 hover:bg-transparent hover:text-indigo-500"
        onClick={decrementVote}
      >
        <Minus />
      </Button>
    </div>
  );
};
