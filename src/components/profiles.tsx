import { useCallback } from "react";
import { useUser } from "@/hooks/useUser";
import { users } from "../users";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Profiles: React.FC = () => {
  const { currentUser, setCurrentUser } = useUser();

  const handleChangeUser = useCallback(
    (user: { id: number; username: string }) => {
      setCurrentUser(user);
    },
    [setCurrentUser],
  );

  return (
    <div>
      <ul className="flex gap-x-2 gap-y-[10px] md:flex-col">
        {users.map((user) => (
          <li
            key={user.id}
            className={`h-10 w-10 cursor-pointer overflow-hidden rounded-full ${currentUser?.id === user.id && "outline outline-2 outline-indigo-600"}`}
          >
            <button
              onClick={() => handleChangeUser(user)}
              aria-label={`Select profile ${user.username}`}
            >
              <div className="relative w-full transition-all duration-300 hover:scale-110">
                <Avatar>
                  <AvatarImage src={user.image.png} alt={user.username} />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute inset-0 left-0 top-0 bg-[#ffffff5d] transition-all duration-300 hover:bg-transparent ${currentUser?.id === user.id && "hidden"}`}
                />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
