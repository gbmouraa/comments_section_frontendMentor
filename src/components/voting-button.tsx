import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";
import { useApp } from "@/hooks/useApp";

interface VotingButtonProps {
  score: number;
  user: string;
  postID: number;
}

export const VotingButton: React.FC<VotingButtonProps> = ({
  score,
  user,
  postID,
}: VotingButtonProps) => {
  const { storedApp, changeStoredApp } = useApp();
  const storedVotes = storedApp.votes;
  const currentUser = storedApp.currentUser.username;

  const findPost = () => {
    const post = storedVotes.find((item) => item.id === postID);
    return post;
  };

  const incrementVote = () => {
    const post = findPost();
    const positives = post?.positives || [];
    let negatives = post?.negatives || [];
    let score;
    let updatedVotes;

    if (positives.includes(currentUser)) return;

    if (negatives.includes(currentUser)) {
      negatives = negatives.filter((item) => item !== currentUser);

      score = positives?.length - negatives?.length;

      updatedVotes = storedVotes.map((item) => {
        if (item.id === postID) {
          item.negatives = negatives;
          item.score = score;
        }
        return item;
      });

      changeStoredApp("votes", updatedVotes);
      return;
    }

    positives.push(currentUser);
    score = positives?.length - negatives?.length;

    updatedVotes = storedVotes.map((item) => {
      if (item.id === postID) {
        item.positives = positives;
        item.score = score;
      }
      return item;
    });

    changeStoredApp("votes", updatedVotes);
  };

  const decrementVote = () => {
    const post = findPost();
    let positives = post?.positives || [];
    const negatives = post?.negatives || [];
    let score;
    let updatedVotes;

    if (negatives.includes(currentUser)) return;

    if (positives.includes(currentUser)) {
      positives = positives.filter((item) => item !== currentUser);

      score = positives?.length - negatives?.length;

      updatedVotes = storedVotes.map((item) => {
        if (item.id === postID) {
          item.positives = positives;
          item.score = score;
        }
        return item;
      });

      changeStoredApp("votes", updatedVotes);
      return;
    }

    negatives.push(currentUser);
    score = positives?.length - negatives?.length;

    updatedVotes = storedVotes.map((item) => {
      if (item.id === postID) {
        item.negatives = negatives;
        item.score = score;
      }
      return item;
    });

    changeStoredApp("votes", updatedVotes);
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
      <span className="font-medium text-indigo-400">{score}</span>
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
