import { useEffect } from "react";
import useStorageState from "./useStorageState";

const useTheme = () => {
  const [theme, setTheme] = useStorageState("theme", "dark");

  useEffect(() => {    
    const darkName = 'dark';
    const documentClass = window.document.documentElement.classList;

    //debugger;
    if(theme === darkName) 
      documentClass.add('dark') 
    else documentClass.remove('dark');
  }, [theme, setTheme]);

  return [theme, setTheme] as const;
};

export default useTheme;