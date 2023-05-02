"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CourseRegistrationActionHandler_1 = require("./CourseRegistrationActionHandler");
const CourseRegistrationPage_1 = __importDefault(require("./CourseRegistrationPage"));
function CourseRegisttrationContainer(props) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CourseRegistrationActionHandler_1.CourseRegistrationActionHandler, null, ({ state, onAction }) => {
            return react_1.default.createElement(CourseRegistrationPage_1.default, { state: state, onAction: onAction });
        }));
}
exports.default = CourseRegisttrationContainer;
