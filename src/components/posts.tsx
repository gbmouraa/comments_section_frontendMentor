import React from "react";
import { useState, useEffect } from "react";
import { Post } from "./post";
import { api } from "../api";
import { PostProps } from "@/types";

export const Posts: React.FC = () => {
  const [comments, setComments] = useState<PostProps[]>([]);

  // criar loading no contexto
  useEffect(() => {
    const apiRequest = async () => {
      try {
        const response = await api.get(
          "https://api.npoint.io/ea2b68c1f15138d49a4b",
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error(
          "Sorry,it was not possible to communicate with our api " + error,
        );
      }
    };
    apiRequest();
  }, []);

  return (
    <div className="flex flex-col">
      {comments.map((item) => {
        return (
          <ul key={item.id}>
            <li key={item.id}>
              <Post
                content={item.content}
                id={item.id}
                user={item.user}
                replies={item.replies}
                score={item.score}
              />
            </li>
          </ul>
        );
      })}
    </div>
  );
};
