import { useUser } from "@/hooks/useUser";
import { users } from "../users";

export const Profiles: React.FC = () => {
  const { currentUser, setCurrentUser } = useUser();

  const handleChangeUser = (user: { id: number; username: string }) => {
    const data = {
      id: user.id,
      username: user.username,
    };
    setCurrentUser(data);
  };

  return (
    <div>
      <ul className="flex gap-x-2">
        {users.map((user) => (
          <li
            key={user.id}
            className={`h-10 w-10 cursor-pointer overflow-hidden rounded-full outline outline-2 outline-transparent ${currentUser?.id === user.id && "outline-indigo-600"}`}
          >
            <button onClick={() => handleChangeUser(user)}>
              <div className="relative w-full transition-all duration-300 hover:scale-110">
                <img src={user.image.png} alt={user.username} />
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
