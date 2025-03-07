import React, { useEffect } from "react";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { VotingButton } from "./voting-button";
import { PostProps } from "@/types";
import { ReplyButton } from "./reply-button";
import { useApp } from "@/hooks/useApp";
import { EditComment } from "./edit-comment";
import { Replies } from "./replies";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export const Post: React.FC<PostProps> = ({
  content,
  user,
  replies,
  score,
  id,
}: PostProps) => {
  const { storedApp, setStoredApp, isEditing, setIsEditing } = useApp();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleEdit = (id: number) => {
    if (textAreaRef.current?.value !== "") {
      const updatedPost = textAreaRef.current?.value;
      const postIndex = storedApp?.posts?.findIndex((post) => post.id === id);
      let posts = storedApp?.posts;
      posts![postIndex!].content = updatedPost!;
      const data = {
        ...storedApp,
        posts: posts,
      };
      setStoredApp((prev) => ({
        ...prev,
        posts: posts,
      }));

      localStorage.setItem("@postApp", JSON.stringify(data));

      setIsEditing({ active: false, postID: null });
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-[720px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Card className="min-h-[140px] bg-white text-zinc-500 dark:bg-[#2c2f33] dark:text-gray-200">
        <div className="">
          <CardHeader className="md:w-[calc(100%-64px)] md:translate-x-[64px]">
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
              <span className="text-sm font-thin">1 month ago</span>
            </CardTitle>
          </CardHeader>
          {isEditing.active && isEditing.postID === id ? (
            <div className="mx-auto max-w-[608px] translate-x-6">
              <Textarea defaultValue={content} ref={textAreaRef} />
              <Button
                className="ml-auto mt-3 block bg-indigo-500 text-white dark:text-[#2c2f33]"
                onClick={() => handleEdit(id)}
              >
                Update
              </Button>
            </div>
          ) : (
            <CardContent className="md:w-[calc(100%-64px)] md:translate-x-[64px]">
              <p className="">{content}</p>
            </CardContent>
          )}
        </div>
        <CardFooter className="justify-between">
          <VotingButton score={score} user={user.username} />
          {storedApp?.currentUser?.username !== user.username ? (
            <ReplyButton />
          ) : (
            <EditComment id={id} />
          )}
        </CardFooter>
      </Card>
      {replies ? (
        <ul className="ml-auto mt-2 w-[95%] space-y-3 border-l-2 dark:border-neutral-700">
          {replies.map((item) => (
            <li key={item.id} className="ml-auto w-[95%]">
              <Replies
                content={item.content}
                id={item.id}
                user={item.user}
                replies={item.replies}
                score={item.score}
                replyingTo={item.replyingTo}
                replyingToUserID={id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </motion.div>
  );
};
