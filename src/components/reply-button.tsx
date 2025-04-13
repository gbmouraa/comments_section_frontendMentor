import { Button } from "./ui/button";
import { useApp } from "@/hooks/useApp";

interface ReplyButtonProps {
  id: number;
  users: string[];
  isReply?: { originalPostID: number; replyID: number };
}

export const ReplyButton: React.FC<ReplyButtonProps> = ({
  id,
  users,
  isReply,
}) => {
  const { changeIsReplying, storedApp } = useApp();

  const handleReply = () => {
    // reply of other reply
    if (!isReply) {
      changeIsReplying(true, id, users, null);
      return;
    }

    // this list removes the tag name if it is replying to a comment on its own post
    const refineUsers = (): string[] => {
      const refined = users.filter(
        (user) => user !== storedApp.currentUser.username,
      );
      return refined;
    };

    const filteredUsers = refineUsers();
    changeIsReplying(true, isReply.originalPostID, filteredUsers, id);
  };

  return (
    <div className="md:absolute md:right-6 md:top-6">
      <Button
        variant="ghost"
        className="shadow-none transition-all hover:bg-transparent hover:opacity-70"
        onClick={handleReply}
      >
        <img
          src="https://frontendmentor-showcase.netlify.app/static/media/icon-reply.bfb4589d45cd96abd45e3b82f7e7bbc6.svg"
          alt="Reply icon"
        />
        <span className="text-indigo-400">Reply</span>
      </Button>
    </div>
  );
};
