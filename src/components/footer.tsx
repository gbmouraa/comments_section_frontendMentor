import { FaLinkedin, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-3 p-4 pt-8 text-zinc-500 dark:text-gray-200">
      <span>Desenvolvido por Gabriel Moura</span>
      <a
        href="https://www.linkedin.com/in/gabriel-moura-b63382161/"
        target="_blank"
        rel="noopener roreferrer"
        className="transition-transform hover:scale-110"
      >
        <FaLinkedin size={20} />
      </a>
      <a
        href="https://github.com/gbmouraa"
        target="_blank"
        rel="noopener roreferrer"
        className="transition-transform hover:scale-110"
      >
        <FaGithub size={20} />
      </a>
    </footer>
  );
};
