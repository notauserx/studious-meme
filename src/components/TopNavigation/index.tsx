import {
  FaHackerNews,
  FaReadme,
  FaGithub,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import useDarkMode from "../../hooks/useDarkMode";

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

const Title = () => (<h5 className="title-text">Studious-memes</h5>);

export { Title, GitHubLink, ApiReferenceLink, TopNavigation};
