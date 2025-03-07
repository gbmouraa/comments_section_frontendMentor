import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash, Pencil } from "lucide-react";
import { useApp } from "@/hooks/useApp";

interface EditCommentProps {
  id: number;
  replyingToUserID?: number;
}

export const EditComment: React.FC<EditCommentProps> = ({
  id,
  replyingToUserID,
}: EditCommentProps) => {
  const { storedApp, setStoredApp, setIsEditing, isEditing } = useApp();

  const handleDelete = () => {
    // if the post is a reply
    if (replyingToUserID) {
      const originalPostIndex = storedApp!.posts?.findIndex(
        (item) => item.id === replyingToUserID,
      );
      const originalPost = storedApp?.posts![originalPostIndex!];
      const updatedReplies = originalPost!.replies.filter(
        (item) => item.id !== id,
      );
      originalPost!.replies = updatedReplies;
      const posts = storedApp?.posts!;
      posts[originalPostIndex] = originalPost;
      setStoredApp((prev) => ({
        ...prev,
        posts: posts,
      }));
      const updatedData = { ...storedApp, posts: posts };
      localStorage.setItem("@postApp", JSON.stringify(updatedData));
      return;
    }

    let updatedPosts = storedApp?.posts?.filter((item) => item.id !== id);
    setStoredApp((prev) => ({
      ...prev,
      posts: updatedPosts,
    }));
    const updatedData = { ...storedApp, posts: updatedPosts };
    localStorage.setItem("@postApp", JSON.stringify(updatedData));
  };

  const handleEdit = (id: number) => {
    setIsEditing({ active: !isEditing.active, postID: id });
  };

  return (
    <div className="md:absolute md:right-6 md:top-6">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"} className="px-2 hover:bg-transparent">
            <Trash color="#ff0000" />
            <span className="font-medium text-red-500">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? 😱 This will remove
              the comment and can't be undone. Like never ever. 😈
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Please, don't</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        variant="ghost"
        className="px-2 text-indigo-400 transition-all hover:bg-transparent hover:text-indigo-400 hover:opacity-70"
        onClick={() => handleEdit(id)}
      >
        <Pencil />
        Edit
      </Button>
    </div>
  );
};
