import React from "react";
import { Post } from "./post-item";
import { useApp } from "@/hooks/useApp";
import { motion } from "framer-motion";

export const Posts: React.FC = () => {
  const { storedApp } = useApp();

  return (
    <div className="mt-10 flex -translate-y-5 flex-col items-center md:mt-6">
      <ul className="flex w-full flex-col items-center">
        {storedApp?.posts &&
          storedApp?.posts.map((item) => {
            return (
              <motion.li
                className="flex w-full justify-center"
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
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
                  createdAt={item.createdAt}
                />
              </motion.li>
            );
          })}
      </ul>
    </div>
  );
};
