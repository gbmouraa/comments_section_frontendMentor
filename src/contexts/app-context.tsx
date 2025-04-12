import { createContext } from "react";

export interface StoredAppData {
  alreadyStored: boolean;
  theme: "light" | "dark";
  currentUser: CurrentUserProps;
  posts: PostProps[] | null;
}

export interface PostProps {
  content: string;
  id: number;
  user: {
    image: string;
    username: string;
  };
  replies: ReplyProps[];
  score: number;
  createdAt?: string;
}

export interface ReplyProps {
  content: string;
  id: number;
  user: {
    image: string;
    username: string;
  };
  score: number;
  replyingTo: string[];
  replyingToPostID: number;
  createdAt?: Date;
}

interface CurrentUserProps {
  username: string;
  image: string;
}

export interface isEditingProps {
  active: boolean;
  postID: number | null;
}

export type isLoading = boolean;

export interface IsReplyingProps {
  active: boolean;
  replyingToCommentID: number | null;
  usernames: string[] | null;
  // replying to other reply
  replyId: number | null;
  id: number | null;
}

export type AppContextData = {
  storedApp: StoredAppData;
  changeStoredApp: (key: string, value: any) => void;
  isLoading: isLoading;
  isEditing: isEditingProps;
  changeIsEditing: (active: boolean, id: number | null) => void;
  isReplying: IsReplyingProps;
  changeIsReplying: (
    active: boolean,
    id: number | null,
    usernames: string[] | null,
    // replying to other reply
    replyId: number | null,
  ) => void;
};

export const AppContext = createContext({} as AppContextData);
