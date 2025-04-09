import React from "react";
import { Post } from "./post-item";
import { useApp } from "@/hooks/useApp";
import { motion } from "framer-motion";

export const Posts: React.FC = () => {
  const { storedApp } = useApp();

  return (
    <div className="mt-10 flex -translate-y-5 flex-col items-center md:mt-6">
      <ul className="space-y-2">
        {storedApp?.posts &&
          storedApp?.posts.map((item, idx) => {
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
                />
              </motion.li>
            );
          })}
      </ul>
    </div>
  );
};
