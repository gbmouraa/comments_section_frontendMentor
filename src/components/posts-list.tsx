import React from "react";
import { useState, useEffect } from "react";
import { Post } from "./post-item";
import { api } from "../api";
import { PostProps } from "@/types";

export const Posts: React.FC = () => {
  const [comments, setComments] = useState<PostProps[]>([]);

  useEffect(() => {
    const apiRequest = async () => {
      try {
        const response = await api.get(
          "https://api.npoint.io/ea3f650878adcbc9d32f",
        );
        setComments(response.data.comments);
        // localStorage.setItem()
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
      <ul>
        {comments.map((item) => {
          return (
            <li key={item.id}>
              <Post
                postID={item.postID}
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
