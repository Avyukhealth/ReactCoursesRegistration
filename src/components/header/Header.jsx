import { memo } from "react";
import styled from "styled-components";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import image from "../../images/logo.png";

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

let Header = ({name,userName,links}) => {
  return (
    <nav className="flex header">
      <div className="header-image">
        <Link to={"/"}>
          <img src={image} style={{ width: "85px", height: "85px" }} />
        </Link>
      </div>
      <div className="flex header-name ">
        <FontAwesomeIcon icon={faBook} />
        <h1>{name}</h1>
      </div>
      <div className="flex header-links-and-profile">
        <Ul className="flex header-links">
          {links?.map((element) => {
            return (
              <div key={element}>
                <Link to={element === "Registration" ? "/" : `/${element}`}>
                  {" "}
                  <li>{element}</li>{" "}
                </Link>
              </div>
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
};
Header = memo(Header);
export default Header;
