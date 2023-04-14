"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
require("./SemSelector.css");
exports.Selector = styled_components_1.default.select `
  background-color: #223243;
  border: none;
  outline: none;
  padding: 8px;
  padding-right: 10px;
  border-radius: 0.5rem;
  color: rgb(227, 224, 218);
`;
//
function SemSelector({ semVal, handleSemVal }) {
    return (react_1.default.createElement("div", { className: "sem-selector" },
        react_1.default.createElement("span", null,
            "Please select the semester to select the courses",
            " ",
            react_1.default.createElement(exports.Selector, { value: semVal, name: "semVal", id: "semVal", onChange: (e) => handleSemVal(e), "data-testid": "semVal" },
                react_1.default.createElement("option", { value: "none" }, "None"),
                react_1.default.createElement("option", { value: "All" }, "All"),
                react_1.default.createElement("option", { value: "1" }, "1"),
                react_1.default.createElement("option", { value: "2" }, "2"),
                react_1.default.createElement("option", { value: "3" }, "3"),
                react_1.default.createElement("option", { value: "4" }, "4"),
                react_1.default.createElement("option", { value: "5" }, "5"),
                react_1.default.createElement("option", { value: "6" }, "6"),
                react_1.default.createElement("option", { value: "7" }, "7"),
                react_1.default.createElement("option", { value: "8" }, "8")))));
}
exports.default = SemSelector;
