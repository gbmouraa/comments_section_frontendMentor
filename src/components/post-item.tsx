import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CommentVotingButton } from "./comment-voting-button";
import { PostProps } from "@/types";
import { Reply } from "./reply";
import { useUser } from "@/hooks/useUser";
import { EditComment } from "./edit-comment";
import { Replies } from "./replies";

// same component for replies
export const Post: React.FC<PostProps> = ({
  content,
  id,
  user,
  replies,
  score,
}: PostProps) => {
  const { currentUser } = useUser();

  return (
    <div className="relative min-w-full">
      <Card className="max-w-[730px] bg-white text-zinc-500 dark:bg-[#2c2f33] dark:text-gray-200">
        <div className="md:max-w-[80%] md:translate-x-[64px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-3">
              <Avatar>
                <AvatarImage
                  src={user.image.png}
                  alt="Profile picture"
                  width={36}
                />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <span className="flex gap-x-2 text-base font-medium text-indigo-900 dark:text-gray-200">
                {user.username}{" "}
                {currentUser?.id === id && (
                  <Badge className="bg-indigo-600 text-xs text-white">
                    you
                  </Badge>
                )}
              </span>
              <span className="text-sm font-thin">1 month ago</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{content}</p>
          </CardContent>
        </div>
        <CardFooter className="justify-between">
          <CommentVotingButton score={score} />
          {currentUser?.id !== id ? <Reply /> : <EditComment />}
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
              />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};
