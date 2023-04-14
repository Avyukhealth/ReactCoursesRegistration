import React, { ReactNode } from "react";
import "./Footer.css";
import styled from "styled-components";

const FooterSpan = styled.span`
  color: var(--text-color);
`;

let Footer = () => {
  return (
    <FooterSpan className="footer flex">Copyrights ©Duke University</FooterSpan>
  );
};

let MemoFooter = React.memo(Footer);

export default MemoFooter;
