
import {
  FaSearch,
  FaHackerNews,
  FaRegBell,
  FaGithub,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';


const TopNavigation = () => {
  return (
    <div className='top-navigation'>
    <div className="flex items-center justify-between p-4">

      <FaHackerNews className='top-navigation-icon'/>
      
      <Title />
      <MenuItems />
      <ThemeIcon />
      <GitHubIcon />
    </div>
    </div>
  );
};

const MenuItems = () => {
  return (
    <>
      
    </>
  )
}

const ThemeIcon = () => {
 
  const [theme, setTheme] = useTheme();

  const icon = theme === 'dark' ? (
    <span onClick={() => setTheme('')}>
      <FaMoon className="h-6 w-6 top-navigation-icon"/>
    </span>
  ) : (
    <span onClick={() => setTheme('dark')}>
      <FaSun  className="top-navigation-icon"/>
    </span>
  )

  return icon; 
}

const GitHubIcon = () => (
  <a href='https://github.com/notauserx/studious-meme' target='_blank'>
    <FaGithub className='top-navigation-icon'></FaGithub>
  </a>
)

const Title = () => <h5 className='title-text'>Studious-memes</h5>;

export default TopNavigation;
  