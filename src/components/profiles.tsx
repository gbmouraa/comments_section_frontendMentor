import { users } from "@/users";
import { useApp } from "@/hooks/useApp";
import { Avatar, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";

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
    <div className="ml-auto">
      <ul className="right-4 top-4 flex gap-2 md:flex-col">
        {users.map((user, idx) => (
          <motion.li
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.4 + 0.2 * idx,
              ease: [0.25, 0.46, 0.45, 0.94],
              duration: 1,
            }}
            key={idx}
            className={`h-10 w-10 cursor-pointer overflow-hidden rounded-full opacity-0 transition-opacity duration-700 ease-out ${storedApp?.currentUser?.username === user.username && "outline outline-2 outline-indigo-600"} `}
          >
            <button
              onClick={() => handleChangeUser(user)}
              aria-label={`Select profile ${user.username}`}
            >
              <div className="duration-800 relative w-full transition-all hover:scale-110">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.username} />
                </Avatar>
                <div
                  className={`absolute inset-0 left-0 top-0 bg-[#ffffff5d] transition-all duration-300 hover:bg-transparent ${storedApp?.currentUser?.username === user.username && "hidden"}`}
                />
              </div>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
