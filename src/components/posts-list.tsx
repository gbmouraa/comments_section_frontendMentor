import React from "react";
import { Post } from "./post-item";
import { useApp } from "@/hooks/useApp";
import { motion } from "framer-motion";

export const Posts: React.FC = () => {
  const { storedApp } = useApp();

  return (
    <div className="flex flex-col">
      <ul>
        {storedApp?.posts.map((item, idx) => {
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.4 + 0.2 * idx,
                ease: [0.25, 0.46, 0.45, 0.94],
                duration: 1,
              }}
            >
              <Post
                content={item.content}
                id={item.id}
                user={item.user}
                replies={item.replies}
                score={item.score}
                isReply={item.user.username !== storedApp.currentUser?.username}
              />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
