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
  replyingToPostID?: number;
}

export const EditComment: React.FC<EditCommentProps> = ({
  id,
  replyingToPostID,
}: EditCommentProps) => {
  const { storedApp, changeStoredApp, changeIsEditing, isEditing } = useApp();

  const handleDelete = () => {
    if (replyingToPostID) {
      const postIdx = storedApp.posts?.findIndex(
        (item) => item.id === replyingToPostID,
      );
      const post = storedApp.posts![Number(postIdx)];
      let replies = post.replies;
      replies = replies.filter((item) => item.id !== id);
      post.replies = replies;
      const updatedPost = storedApp.posts;
      updatedPost![Number(postIdx)] = post;
      changeStoredApp("posts", updatedPost);
      return;
    }

    const updatedPosts = storedApp?.posts?.filter((item) => item.id !== id);
    changeStoredApp("posts", updatedPosts);
  };

  const handleEdit = (id: number) => {
    changeIsEditing(true, id);
  };

  return (
    <div className="flex md:absolute md:right-6 md:top-6">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="px-2 text-red-500 transition-colors hover:bg-transparent hover:text-red-500/70"
          >
            <Trash />
            <span className="font-medium">Delete</span>
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
      {isEditing.postID !== id ? (
        <Button
          variant="ghost"
          className="px-2 text-indigo-400 transition-colors hover:bg-transparent hover:text-indigo-400/70"
          onClick={() => handleEdit(id)}
        >
          <Pencil />
          Edit
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="px-2 text-indigo-400 transition-colors hover:bg-transparent hover:text-indigo-400/70"
          onClick={() => changeIsEditing(false, null)}
        >
          Cancel
        </Button>
      )}
    </div>
  );
};
