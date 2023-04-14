"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Footer.css");
const styled_components_1 = __importDefault(require("styled-components"));
const FooterSpan = styled_components_1.default.span `
  color: var(--text-color);
`;
let Footer = () => {
    return (react_1.default.createElement(FooterSpan, { className: "footer flex" }, "Copyrights \u00A9Duke University"));
};
let MemoFooter = react_1.default.memo(Footer);
exports.default = MemoFooter;
