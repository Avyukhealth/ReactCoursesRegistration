"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Course_1 = __importDefault(require("../course/Course"));
require("./MyCourses.css");
function MyCourses({ myCourses }) {
    console.log(myCourses);
    return (react_1.default.createElement("div", { className: "flex my-courses-div" }, myCourses?.map((course) => {
        return react_1.default.createElement(Course_1.default, { key: course.courseId, course: course });
    })));
}
exports.default = MyCourses;
