"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonSubmit = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
require("./SubmitButton.css");
exports.ButtonSubmit = styled_components_1.default.button `
  width: 80px;
  background-color: orange;
  color: black;
  border-radius: 1rem;
  border: none;
  padding: 4px;

  &:hover {
    background-color: #6c71ba;
  }
`;
function SubmitButton({ handleCoursesSubmit }) {
    return (react_1.default.createElement("div", { className: "flex submit-button-div" },
        react_1.default.createElement(exports.ButtonSubmit, { onClick: handleCoursesSubmit }, "Submit")));
}
exports.default = SubmitButton;
