import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useApp } from "@/hooks/useApp";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ReplyProps } from "@/contexts/app-context";

interface AddReplyProps {
  // id of the post being replied to
  id: number;
}

export const AddReply: React.FC<AddReplyProps> = ({ id }) => {
  const [text, setText] = useState("");
  const { storedApp, changeStoredApp, changeIsReplying, isReplying } = useApp();
  const user = storedApp?.currentUser;

  const findPost = () => {
    const post = storedApp.posts?.find((item) => item.id === id);
    return post;
  };

  const handleSubmit = () => {
    const post = findPost();
    const postsList = storedApp.posts;
    const content: string = text;

    const reply: ReplyProps = {
      content: content,
      id: Date.now(),
      score: 0,
      user: {
        image: storedApp.currentUser.image,
        username: storedApp.currentUser.username,
      },
      createdAt: new Date(),
      replyingTo: isReplying.usernames!,
      replyingToPostID: id,
    };

    post?.replies.push(reply);
    changeStoredApp("posts", postsList);
    changeIsReplying(false, null, null, null);
  };

  return (
    <div className="ml-auto w-[95%] border-l-2 dark:border-neutral-700 md:max-w-[720px]">
      <Card className="ml-auto flex min-h-[140px] w-[95%] gap-3 bg-white p-6 text-zinc-500 dark:bg-[#2c2f33] dark:text-gray-200">
        <img
          src={user?.image}
          alt="User image"
          className="h-11 w-11 rounded-full"
        />
        <Textarea value={text} onChange={(e) => setText(e.target.value)} />
        <div className="flex flex-col justify-between">
          <Button onClick={handleSubmit}>SEND</Button>
          <Button
            variant={"ghost"}
            onClick={() => changeIsReplying(false, null, null, null)}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};
