import { motion } from "framer-motion";
import { PostProps } from "@/types";
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

export const Replies: React.FC<PostProps> = ({
  id,
  content,
  user,
  replies,
  score,
  replyingTo,
  replyingToUserID,
}: PostProps) => {
  const { storedApp } = useApp();

  return (
    <motion.div
      className="relative min-w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Card className="max-w-[730px] bg-white text-zinc-500 dark:bg-[#2c2f33] dark:text-gray-200">
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
              <span className="text-sm font-thin">1 month ago</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <span className="text-indigo-400">@{replyingTo} </span>
              {content}
            </p>
          </CardContent>
        </div>
        <CardFooter className="justify-between">
          <VotingButton score={score} user={user.username} />
          {storedApp?.currentUser?.username !== user.username ? (
            <ReplyButton />
          ) : (
            <EditComment id={id} replyingToUserID={replyingToUserID} />
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
