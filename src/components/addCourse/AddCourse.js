"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const SubmitButton_1 = __importDefault(require("../SubmitButton/SubmitButton"));
require("./AddCourse.css");
function isCourseKey(key, course) {
    return key in Object.keys(course);
}
function AddCourse() {
    const initialObject = {
        courseName: "",
        credits: "",
        professor: "",
        limit: "",
        eligibility: "",
        sem: "",
        courseId: ""
    };
    const [course, SetCourse] = (0, react_2.useState)(initialObject);
    function handleChange(e) {
        if (!e)
            return;
        let obj = { ...course };
        if (typeof e.target.name !== 'string')
            return;
        if (typeof e.target.value !== 'string')
            return;
        let a = e.target.name;
        let b = e.target.value;
        if (!a || !b)
            return;
        if (isCourseKey(a, course)) {
            obj[a] = b;
            SetCourse({
                ...course,
                ...obj,
            });
        }
        else
            SetCourse(initialObject);
    }
    function handleCoursesSubmit() {
        if (course.courseName === "" ||
            course.credits === "" ||
            course.professor === "" ||
            course.limit === "" ||
            course.eligibility === "" ||
            course.sem === "") {
            alert("Fields cannot be empty");
            return;
        }
        let res = JSON.parse(localStorage.getItem("allCourses") || "[]");
        let id = 3424;
        let maxId = 1;
        JSON.parse(localStorage.getItem("allCourses") || "[]")?.forEach((course) => {
            maxId = Math.max(maxId, Number(course?.courseId));
        });
        id = maxId + 1;
        res.push({ ...course, courseId: id });
        localStorage.setItem("allCourses", JSON.stringify(res));
        SetCourse(initialObject);
        alert("Course Submitted Successfully!");
    }
    return (react_1.default.createElement("div", { className: "flex add-course-div" },
        react_1.default.createElement("div", { className: "add-course-div-heading" },
            react_1.default.createElement("h3", null, "Add Course")),
        react_1.default.createElement("input", { name: "courseName", type: "text", onChange: handleChange, value: course.courseName, placeholder: "Enter Course Name" }),
        react_1.default.createElement("input", { name: "credits", onChange: handleChange, type: "number", value: course.credits, placeholder: "Enter Credits" }),
        react_1.default.createElement("input", { name: "professor", onChange: handleChange, type: "text", value: course.professor, placeholder: "Enter Professor" }),
        react_1.default.createElement("input", { name: "limit", onChange: handleChange, type: "text", value: course.limit, placeholder: "Enter Limit" }),
        react_1.default.createElement("input", { name: "eligibility", onChange: handleChange, value: course.eligibility, type: "text", placeholder: "Enter Eligibility" }),
        react_1.default.createElement("input", { name: "sem", onChange: handleChange, value: course.sem, type: "text", placeholder: "Enter Sem" }),
        react_1.default.createElement(SubmitButton_1.default, { handleCoursesSubmit: handleCoursesSubmit })));
}
exports.default = AddCourse;
