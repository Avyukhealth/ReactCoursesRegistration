"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Course.css");
function CourseComp({ course }) {
    return (react_1.default.createElement("div", { className: "course-div" },
        react_1.default.createElement("p", null, course.courseName),
        react_1.default.createElement("p", null, course.credits),
        react_1.default.createElement("p", null, course.professor),
        react_1.default.createElement("p", null, course.sem)));
}
exports.default = CourseComp;
