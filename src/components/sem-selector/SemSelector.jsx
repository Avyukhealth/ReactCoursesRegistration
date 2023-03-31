import React from "react";
import styled from "styled-components";
import { useLocalStorage } from "../../custom-hooks/useGetDataFromLocalStorage";
import "./SemSelector.css";

export const Selector = styled.select`
  background-color: #223243;
  border: none;
  outline: none;
  padding: 8px;
  padding-right: 10px;
  border-radius: 0.5rem;
  color: rgb(227, 224, 218);
`;
//
export default function SemSelector({ semVal, handleSemVal }) {
  // let [allCourses, setAllCourses] = useLocalStorage("allCourses");
  return (
    <div className="sem-selector">
      <span>
        Please select the semester to select the courses{" "}
        <Selector value={semVal} name="semVal" id="semVal" onChange={(e) => handleSemVal(e)}>
          <option value="none">None</option>
          <option value="All">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </Selector>
      </span>
    </div>
  );
}
