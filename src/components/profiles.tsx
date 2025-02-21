import { users } from "@/users";
import { useApp } from "@/hooks/useApp";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Profiles: React.FC = () => {
  const { setStoredApp, storedApp } = useApp();

  const handleChangeUser = (user: { username: string; image: string }) => {
    setStoredApp((prev) => ({
      ...prev,
      currentUser: user,
    }));

    const data = {
      ...storedApp,
      currentUser: user,
    };

    localStorage.setItem("@postApp", JSON.stringify(data));
  };

  return (
    <div>
      <ul className="flex gap-x-2 gap-y-[10px] md:flex-col">
        {users.map((user) => (
          <li
            key={user.username}
            className={`h-10 w-10 cursor-pointer overflow-hidden rounded-full ${storedApp?.currentUser?.username === user.username && "outline outline-2 outline-indigo-600"}`}
          >
            <button
              onClick={() => handleChangeUser(user)}
              aria-label={`Select profile ${user.username}`}
            >
              <div className="relative w-full transition-all duration-300 hover:scale-110">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.username} />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute inset-0 left-0 top-0 bg-[#ffffff5d] transition-all duration-300 hover:bg-transparent ${storedApp?.currentUser?.username === user.username && "hidden"}`}
                />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
