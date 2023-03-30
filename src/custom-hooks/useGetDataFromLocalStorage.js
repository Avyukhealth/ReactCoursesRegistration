import { useEffect, useState } from "react";

export function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : "";
    } catch (error) {
      console.error(error);
      return "";
    }
  });

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue ? JSON.parse(storedValue) : "");
    } catch (error) {
      console.error(error);
      return "";
    }
  }, [key]);
  return [value, setValue];
  //   const [value1, setValue1] = useState([""]);
  //   return [value1, setValue1];
}
