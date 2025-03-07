export type StoredAppType = {
  alreadyStored: boolean;
  theme: "light" | "dark";
  currentUser: CurrentUserType | null;
  posts: PostProps[] | null | undefined;
  replies: [] | null;
};

export interface PostProps {
  content: string;
  id: number;
  user: {
    image: string;
    username: string;
  };
  replies: PostProps[];
  score: number;
  replyingTo?: string;
  replyingToUserID?: number;
}

export type CurrentUserType = {
  username: string;
  image: string;
};

export type isLoadingType = true | false;

export type isEditingType = {
  active: true | false;
  postID: number | null;
};

export type AppValueContext = {
  storedApp: StoredAppType | null;
  setStoredApp: React.Dispatch<React.SetStateAction<StoredAppType>>;
  isLoading: isLoadingType;
  isEditing: isEditingType;
  setIsEditing: React.Dispatch<React.SetStateAction<isEditingType>>;
};
