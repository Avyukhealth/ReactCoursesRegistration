import React from "react";
import styled from "styled-components";
import "./SubmitButton.css";

const ButtonSubmit = styled.button`
  width: 80px;
  background-color: orange;
  color: black;
  border-radius: 1rem;
  border: none;
  padding: 4px;

  &:hover{
    background-color: #6c71ba;
  }
  
`;

export default function SubmitButton() {
  return (
    <div className="flex submit-button-div">
      <ButtonSubmit>Submit</ButtonSubmit>
    </div>
  );
}
