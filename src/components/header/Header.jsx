import React from "react";
import styled from "styled-components";
import "./Header.css";
import logo from "./logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Ul = styled.ul`
  li {
  }
  a {
    &:hover {
      color: red;
    }
  }
  list-style: none;
`;



export default function Header({ name, links, userName, userIcon }) {
  const logf = logo;

  return (
    <nav className="flex header">
      <div className="header-image">
        <img alt="Logo" src="./logo.png" />
      </div>

      <div className="flex header-name ">
        <FontAwesomeIcon icon={faBook} />
        <h1>{name}</h1>
      </div>

      <div className="flex header-links-and-profile">
        <Ul className="flex header-links">
          {links?.map((element) => {
            return (
              <a href="">
                {" "}
                <li key={element}>{element}</li>{" "}
              </a>
            );
          })}
        </Ul>
        <div className="flex user-profile">
          <div className="icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="user-name">{userName}</div>
        </div>
      </div>
    </nav>
  );
}
