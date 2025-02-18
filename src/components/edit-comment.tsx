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

export const EditComment: React.FC = () => {
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
            <AlertDialogAction>Yes, Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        variant="ghost"
        className="px-2 text-indigo-400 transition-all hover:bg-transparent hover:text-indigo-400 hover:opacity-70"
      >
        <Pencil />
        Edit
      </Button>
    </div>
  );
};
