import { Post } from "./post-item";
import { PostProps } from "@/types";

export const Replies: React.FC<PostProps> = ({
  id,
  content,
  user,
  replies,
  score,
}: PostProps) => {
  return (
    <Post
      content={content}
      id={id}
      user={user}
      replies={replies}
      score={score}
    />
  );
};
