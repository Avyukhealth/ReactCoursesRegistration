"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const Footer_1 = __importDefault(require("../footer/Footer"));
const Header_1 = __importDefault(require("../header/Header"));
const SearchBar_1 = __importDefault(require("../searchBar/SearchBar"));
const SemSelector_1 = __importDefault(require("../semSelector/SemSelector"));
const SubmitButton_1 = __importDefault(require("../SubmitButton/SubmitButton"));
require("./CourseRegistrationPage.css");
const Table_1 = __importDefault(require("../table/Table"));
const CourseRegistrationActionHandler_1 = require("./CourseRegistrationActionHandler");
function CourseRegistration({ state, onAction }) {
    const handleSemVal = (e) => onAction(CourseRegistrationActionHandler_1.HANDLE_SEM_VAL, { e });
    const handleSelectCourses = (courseId, response) => onAction(CourseRegistrationActionHandler_1.HANDLE_SELECTED_COURSES, { courseId, response });
    const handleCoursesSubmit = () => onAction(CourseRegistrationActionHandler_1.HANDLE_COURSE_SUBMIT, {});
    const handleInputChange = (e) => onAction(CourseRegistrationActionHandler_1.HANDLE_INPUT_CHANGE, { e });
    const links = (0, react_2.useMemo)(() => ["MyCourses", "Admin"], []);
    return (react_1.default.createElement("div", { className: "flex wrapper" },
        react_1.default.createElement(Header_1.default, { name: "Course Registration", userName: "Sainath", links: links }),
        react_1.default.createElement("div", { className: "flex sem-selector-and-search-bar" },
            react_1.default.createElement(SemSelector_1.default, { semVal: state.semVal, handleSemVal: handleSemVal }),
            react_1.default.createElement(SearchBar_1.default, { input: state.input, handleInputChange: handleInputChange })),
        react_1.default.createElement("div", { className: "courses-table" },
            react_1.default.createElement(Table_1.default, { handleSelectCourses: handleSelectCourses, courses: state.courses })),
        react_1.default.createElement("div", { className: "courses-fa-button" },
            react_1.default.createElement(SubmitButton_1.default, { handleCoursesSubmit: handleCoursesSubmit })),
        react_1.default.createElement("div", { className: "footer" },
            react_1.default.createElement(Footer_1.default, null))));
}
exports.default = CourseRegistration;
