import React, { useContext } from "react";
import { UserContext } from "./App";

export default function MyProvude({ children }) {
  const val = 1;
  return (
    <>

      <UserContext.Provider value={val}>{children}</UserContext.Provider>
    </>
  );
  // return <UserContext.Provider value={val}>{children}</UserContext.Provider>;
}

// const MyProvider = ({ children }) => {
//   const val = 'Hello from MyProvider';
//   return <UserContext.Provider value={val}>{children}</UserContext.Provider>;
// };
