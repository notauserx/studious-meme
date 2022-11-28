import { useEffect, useState } from "react";

const useLocalStorageState = (
  key: string,
  initialState: string
): [string, (newValue: string) => void] => {
  const [state, updateState] = useState(() => {
    try {

      return localStorage.getItem(key) || initialState;
    } catch(error) {
        console.log(error);
        return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [state]);

  return [state, updateState];
};

export default useLocalStorageState;
