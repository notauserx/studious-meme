
import { SunIcon, MoonIcon, HashtagIcon } from "@heroicons/react/24/outline";
import useTheme from '../../hooks/useTheme';


const TopNavigation = () => {
  return (
    <div className='top-navigation'>
      <HashtagIcon className="h-6 w-6" />
      <Title />
      <ThemeIcon />
    </div>
  );
};


const ThemeIcon = () => {
 
  const [theme, setTheme] = useTheme();

  const icon = theme === 'dark' ? (
    <span onClick={() => setTheme('')}>
      <MoonIcon className="h-6 w-6"/>
    </span>
  ) : (
    <span onClick={() => setTheme('dark')}>
      <SunIcon  className="h-6 w-6"/>
    </span>
  )

  return icon; 
}



const Title = () => <h5 className='title-text'>Studious-memes</h5>;

export default TopNavigation;
  