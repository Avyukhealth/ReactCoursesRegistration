"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const AddCourse_1 = __importDefault(require("../addCourse/AddCourse"));
const AdminCustomTable_1 = __importDefault(require("../adminCustomTable/AdminCustomTable"));
const Footer_1 = __importDefault(require("../footer/Footer"));
const Header_1 = __importDefault(require("../header/Header"));
const SearchBar_1 = __importDefault(require("../searchBar/SearchBar"));
require("./AdminPage.css");
function AdminPage() {
    const [allCourses, setAllcourses] = (0, react_2.useState)(() => JSON.parse(localStorage.getItem("allCourses") || "[]") || []);
    const [input, setInput] = (0, react_2.useState)(""); // searchText
    const totalCoursesFromLocalStorage = (0, react_2.useMemo)(() => JSON.parse(localStorage.getItem("allCourses") || "[]"), []);
    function handleInputChange(e) {
        if (!e)
            return;
        setInput(e.target.value);
        let res = totalCoursesFromLocalStorage;
        let temp = res?.filter((course) => {
            return (course?.courseName?.toLowerCase().includes(input.toLowerCase()) ||
                course?.professor?.toLowerCase().includes(input.toLowerCase()) ||
                course?.eligibility?.toLowerCase().includes(input.toLowerCase()));
        });
        res = temp;
        setAllcourses(res);
    }
    const links = (0, react_2.useMemo)(() => ["MyCourses", "Admin"], []);
    return (react_1.default.createElement("div", { className: "flex wrapper" },
        react_1.default.createElement(Header_1.default, { name: "Admin Panel", userName: "Sainath", links: links }),
        react_1.default.createElement("div", { className: "flex add-course-and-courses-table-div" },
            react_1.default.createElement("div", { className: "add-courses-component-div" },
                react_1.default.createElement(AddCourse_1.default, null)),
            react_1.default.createElement("div", { className: "flex table-and-search-bar" },
                react_1.default.createElement("div", { className: "flex table-heading-and-search-bar" },
                    react_1.default.createElement("div", { className: "table-heading" },
                        react_1.default.createElement("h3", null, "Add Course")),
                    react_1.default.createElement("div", { className: "table-search-bar" },
                        react_1.default.createElement(SearchBar_1.default, { handleInputChange: handleInputChange }))),
                react_1.default.createElement("div", { className: "custom-table-details" },
                    react_1.default.createElement(AdminCustomTable_1.default, { courses: allCourses })))),
        react_1.default.createElement("div", { className: "footer" },
            react_1.default.createElement(Footer_1.default, null))));
}
exports.default = AdminPage;
