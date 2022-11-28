import {
  FaHackerNews,
  FaReadme,
  FaGithub,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import useDarkMode from "../../hooks/useDarkMode";
import useTheme from "../../hooks/useTheme";

const TopNavigation = () => {
  return (
    <div className="top-navigation">
      <div className="flex items-center justify-between p-4">
        <FaHackerNews className="top-navigation-icon" />
        <Title />
        <MenuItems />

        <ThemeIcon />
        <ApiReferenceLink />
        <GitHubLink />
      </div>
    </div>
  );
};

const MenuItems = () => {
  return <></>;
};

const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();

  const icon =
    theme === "dark" ? (
      <span onClick={() => setTheme("")}>
        <FaMoon className="top-navigation-icon" />
      </span>
    ) : (
      <span onClick={() => setTheme("dark")}>
        <FaSun className="top-navigation-icon" />
      </span>
    );

  return icon;
};


const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size='24' className='top-navigation-icon' />
      ) : (
        <FaMoon size='24' className='top-navigation-icon' />
      )}
    </span>
  );
};

const GitHubLink = () => (
  <a href="https://github.com/notauserx/studious-meme" target="_blank">
    <FaGithub className="top-navigation-icon"></FaGithub>
  </a>
);

const ApiReferenceLink = () => (
  <a href="https://hn.algolia.com/api" target="_blank">
    <FaReadme className="top-navigation-icon"></FaReadme>
  </a>
)

const Title = () => <h5 className="title-text">Studious-memes</h5>;

export default TopNavigation;
