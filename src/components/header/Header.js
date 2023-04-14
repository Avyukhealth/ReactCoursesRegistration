"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ul = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
require("./Header.css");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const free_solid_svg_icons_2 = require("@fortawesome/free-solid-svg-icons");
const react_router_dom_1 = require("react-router-dom");
const logo_png_1 = __importDefault(require("../../images/logo.png"));
exports.Ul = styled_components_1.default.ul `
  li {
  }
  a {
    &:hover {
      color: red;
    }
  }
  list-style: none;
`;
const Header = ({ name, userName, links }) => {
    return (react_1.default.createElement("nav", { className: "flex header" },
        react_1.default.createElement("div", { className: "header-image" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                react_1.default.createElement("img", { src: logo_png_1.default, style: { width: "85px", height: "85px" }, alt: "Logo here" }))),
        react_1.default.createElement("div", { className: "flex header-name " },
            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faBook }),
            react_1.default.createElement("h1", null, name)),
        react_1.default.createElement("div", { className: "flex header-links-and-profile" },
            react_1.default.createElement(exports.Ul, { className: "flex header-links", "data-testid": "flex header-links" }, links?.map((element) => {
                return (react_1.default.createElement("div", { key: element },
                    react_1.default.createElement(react_router_dom_1.Link, { to: element === "Registration" ? "/" : `/${element}` },
                        " ",
                        react_1.default.createElement("li", null, element),
                        " ")));
            })),
            react_1.default.createElement("div", { className: "flex user-profile" },
                react_1.default.createElement("div", { className: "icon" },
                    react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_2.faUser })),
                react_1.default.createElement("div", { className: "user-name" }, userName)))));
};
const MemoHeader = (0, react_2.memo)(Header);
exports.default = MemoHeader;
