import React from "react";
import { Post } from "./post-item";
import { useApp } from "@/hooks/useApp";

export const Posts: React.FC = () => {
  const { storedApp } = useApp();

  return (
    <div className="flex flex-col">
      <ul>
        {storedApp?.posts.map((item) => {
          return (
            <li key={item.id}>
              <Post
                content={item.content}
                id={item.id}
                user={item.user}
                replies={item.replies}
                score={item.score}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
