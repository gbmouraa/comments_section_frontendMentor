import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { PostProps } from "@/contexts/app-context";

export const AddPost: React.FC = () => {
  const { storedApp, changeStoredApp } = useApp();
  const user = storedApp?.currentUser;

  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim() === "") {
      console.log("nada aqui");
      return;
    }

    const postData: PostProps = {
      id: Date.now(),
      createdAt: "1 month ago",
      content: text,
      replies: [],
      score: 0,
      user: {
        image: user?.image!,
        username: user?.username!,
      },
    };

    const updatedPostList = [...storedApp?.posts!, postData];
    changeStoredApp("posts", updatedPostList);

    setText("");
  };

  return (
    <div className="mx-auto w-full max-w-[720px] -translate-y-[20px]">
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
    </div>
  );
};
