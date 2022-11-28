import { useEffect } from "react";
import useStorageState from "./useStorageState";

const useTheme = 
  (): [string, (newValue:string) => void] => {
  const [theme, setTheme] = useStorageState("theme", "");

  useEffect(() => {    
    const darkName = 'dark';
    const documentClass = window.document.documentElement.classList;

    //debugger;
    if(theme === darkName) 
      documentClass.add('dark') 
    else documentClass.remove('dark');
  }, [theme, setTheme]);

  return [theme, setTheme];
};

export default useTheme;