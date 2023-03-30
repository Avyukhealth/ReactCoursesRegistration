import React from "react";
import { useLocalStorage } from "../../custom-hooks/useGetDataFromLocalStorage";

export default function SemSelector({ semVal }) {
  let [allCourses, setAllCourses] = useLocalStorage("allCourses");
  console.log(allCourses);

  return <>

  
  
  </>;
}
