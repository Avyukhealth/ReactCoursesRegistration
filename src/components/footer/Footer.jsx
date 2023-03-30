import React from "react";
import './Footer.css'
import styled from "styled-components";

const FooterSpan = styled.span`
  color: var(--text-color);
`;

export default function Footer() {
  return <FooterSpan className="footer flex">Copyrights ©Duke University</FooterSpan>;
}
