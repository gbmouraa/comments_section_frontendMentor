export type StoredAppType = {
  theme: "light" | "dark";
  currentUser: CurrentUserType | null;
  posts: [];
};

export interface PostProps {
  content: string;
  id: number;
  postID: number;
  user: {
    image: string;
    username: string;
  };
  replies: PostProps[];
  score: number;
}

export type CurrentUserType = {
  username: string;
  image: string;
};

export type AppValueContext = {
  storedApp: StoredAppType | null;
  setStoredApp: React.Dispatch<React.SetStateAction<StoredAppType>>;
};
