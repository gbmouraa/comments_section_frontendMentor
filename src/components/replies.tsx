import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ReplyButton } from "./reply-button";
import { Badge } from "./ui/badge";
import { VotingButton } from "./voting-button";
import { EditComment } from "./edit-comment";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { useApp } from "@/hooks/useApp";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ReplyProps } from "@/contexts/app-context";

export const Replies: React.FC<ReplyProps> = ({
  id,
  content,
  user,
  replyingTo,
  replyingToPostID,
  createdAt,
}: ReplyProps) => {
  const { storedApp, isEditing, changeStoredApp, changeIsEditing } = useApp();

  const [score, setScore] = useState<number>();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const userNames = replyingTo.map((item) => {
    let username = "@" + item;
    return username;
  });

  const formatedUserNames = userNames.join(" ");

  useEffect(() => {
    const handleFocus = () => {
      if (isEditing.active) {
        const length = textAreaRef.current?.value.length;
        textAreaRef.current?.focus();
        textAreaRef.current?.setSelectionRange(length!, length!);
      }
    };
    handleFocus();
  }, [isEditing]);

  useEffect(() => {
    const getPostVotes = () => {
      const score = storedApp.votes.find((item) => item.id === id);
      setScore(score?.score);
    };

    getPostVotes();
  }, [storedApp.votes]);

  const handleEditReply = (id: number) => {
    const postIdx = storedApp.posts?.findIndex(
      (item) => item.id === replyingToPostID,
    );

    const post = storedApp.posts![Number(postIdx)];
    const replyIdx = post.replies.findIndex((item) => item.id === id);
    const reply = post.replies[replyIdx];

    if (textAreaRef.current?.value !== "") {
      reply.content = textAreaRef.current!.value;
      post.replies[replyIdx] = reply;
      const updatedPosts = storedApp.posts;
      updatedPosts![Number(postIdx)] = post;
      changeStoredApp("posts", updatedPosts);
      changeIsEditing(false, null);
    }
  };

  return (
    <motion.div
      className="relative mb-2 ml-auto min-w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 1,
      }}
    >
      <Card className="min-h-[140px] max-w-[730px] bg-white text-zinc-500 dark:bg-[#2c2f33] dark:text-gray-200">
        <div className="md:max-w-[80%] md:translate-x-[64px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-3">
              <Avatar>
                <AvatarImage
                  src={user.image}
                  alt="Profile picture"
                  width={36}
                />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <span className="flex gap-x-2 text-base font-medium text-indigo-900 dark:text-gray-200">
                {user.username}
                {storedApp?.currentUser?.username === user.username && (
                  <Badge className="bg-indigo-600 text-xs text-white">
                    you
                  </Badge>
                )}
              </span>
              <span className="truncate text-sm font-thin">{createdAt}</span>
            </CardTitle>
          </CardHeader>
          {isEditing.active && isEditing.postID === id ? (
            <div className="w-[calc(100%-48px)] translate-x-6 md:mx-auto md:w-[calc(100%+12px)]">
              <Textarea defaultValue={content} ref={textAreaRef} />
              <Button
                className="ml-auto mt-3 block"
                onClick={() => handleEditReply(id)}
              >
                UPDATE
              </Button>
            </div>
          ) : (
            <CardContent>
              <p className="inline-block w-[calc(100%-22px)] break-words">
                <span className="text-indigo-400">{formatedUserNames} </span>
                {content}
              </p>
            </CardContent>
          )}
        </div>
        <CardFooter className="justify-between">
          <VotingButton score={score!} user={user.username} postID={id} />
          {storedApp?.currentUser?.username !== user.username ? (
            <ReplyButton
              id={id}
              users={[...replyingTo, user.username]}
              isReply={{ originalPostID: replyingToPostID, replyID: id }}
            />
          ) : (
            <EditComment id={id} replyingToPostID={replyingToPostID} />
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
