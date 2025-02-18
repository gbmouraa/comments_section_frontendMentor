export interface PostProps {
  content: string;
  id: number;
  user: {
    image: {
      png: string;
    };
    username: string;
  };
  replies: PostProps[];
  score: number;
}
