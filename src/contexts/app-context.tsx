import { createContext } from "react";

export interface StoredAppData {
  alreadyStored: boolean;
  theme: "light" | "dark";
  currentUser: CurrentUserProps;
  posts: PostProps[] | null;
}

interface PostProps {
  content: string;
  id: number;
  user: {
    image: string;
    username: string;
  };
  replies: Reply;
  score: number;
  createdAt?: string;
}

interface Reply {
  content: string;
  id: number;
  user: {
    image: string;
    username: string;
  };
  score: number;
  replyingTo: string[];
  replyindToPostID: number;
  createdAt?: string;
}

interface CurrentUserProps {
  username: string;
  image: string;
}

export interface isEditingProps {
  active: true | false;
  postID: number | null;
}

export type isLoading = true | false;

export interface IsReplyingProps {
  active: true | false;
  replyingToPostID: number | null;
  userNames: string[];
}

export type AppContextData = {
  storedApp: StoredAppData;
  changeStoredApp: (key: string, value: any) => void;
  isLoading: isLoading;
  isEditing: isEditingProps;
  changeIsEditing: (id: number) => void;
  isReplying: IsReplyingProps;
  changeIsReplying: (active: boolean, id: number, usernames: string[]) => void;
};

export const AppContext = createContext({} as AppContextData);
