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

  const getDate = (): string => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatedDate = `${month}/${day}`;
    return formatedDate;
  };

  const handleSubmit = () => {
    const post = findPost();
    const postsList = storedApp.posts;
    const content: string = text;

    const reply: ReplyProps = {
      content: content,
      id: Date.now(),
      user: {
        image: storedApp.currentUser.image,
        username: storedApp.currentUser.username,
      },
      createdAt: getDate(),
      replyingTo: isReplying.usernames!,
      replyingToPostID: id,
    };

    post?.replies.push(reply);
    changeStoredApp("posts", postsList);
    changeIsReplying(false, null, null, null);

    const replyVotes = {
      id: reply.id,
      positives: [],
      negatives: [],
      score: 0,
    };

    const updatedVotesList = storedApp.votes;
    updatedVotesList.push(replyVotes);
    changeStoredApp("votes", updatedVotesList);
  };

  return (
    <div className="mb-2 ml-auto w-[95%] border-l-2 pl-[14px] dark:border-neutral-700 md:max-w-[720px] md:pl-10">
      <Card className="ml-auto flex min-h-[140px] w-full flex-wrap gap-3 bg-white p-6 text-zinc-500 dark:bg-[#2c2f33] dark:text-gray-200 sm:flex-nowrap">
        <img
          src={user?.image}
          alt="User image"
          className="h-11 w-11 rounded-full"
        />
        <Textarea value={text} onChange={(e) => setText(e.target.value)} />
        <div className="ml-auto flex justify-between sm:ml-0 sm:flex-col">
          <Button onClick={handleSubmit} className="sm:order-0 order-1">
            SEND
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => changeIsReplying(false, null, null, null)}
            className="order-0 sm:order-1"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};
