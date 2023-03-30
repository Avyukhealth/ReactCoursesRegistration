import React, { useContext } from "react";
import { UserContext } from "./App";

export default function Test() {
  let val = useContext(UserContext);

  return (
    <div>
      <p>hu</p>
      {val}
    </div>
  );
}
