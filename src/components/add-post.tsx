import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { PostProps } from "@/contexts/app-context";
import { motion } from "framer-motion";

export const AddPost: React.FC = () => {
  const { storedApp, changeStoredApp } = useApp();
  const user = storedApp?.currentUser;

  const [text, setText] = useState("");

  const getDate = (): string => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatedDate = `${month}/${day}`;
    return formatedDate;
  };

  const handleSubmit = () => {
    if (text.trim() === "") {
      return;
    }

    const postData: PostProps = {
      id: Date.now(),
      createdAt: getDate(),
      content: text,
      replies: [],
      user: {
        image: user?.image!,
        username: user?.username!,
      },
    };

    const postVotes = {
      id: postData.id,
      positives: [],
      negatives: [],
      score: 0,
    };

    const updatedPostList = [...storedApp?.posts!, postData];
    changeStoredApp("posts", updatedPostList);

    const updatedVotesList = storedApp.votes;
    updatedVotesList.push(postVotes);
    changeStoredApp("votes", updatedVotesList);

    setText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 1,
      }}
      className="mx-auto w-full max-w-[720px] -translate-y-[20px]"
    >
      <Card className="flex min-h-[140px] flex-wrap gap-3 bg-white p-6 text-zinc-500 dark:bg-[#2c2f33] dark:text-gray-200 sm:flex-nowrap">
        <img
          src={user?.image}
          alt="User image"
          className="h-11 w-11 rounded-full"
        />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-w-[220px]"
        />
        <Button onClick={handleSubmit} className="ml-auto">
          SEND
        </Button>
      </Card>
    </motion.div>
  );
};
