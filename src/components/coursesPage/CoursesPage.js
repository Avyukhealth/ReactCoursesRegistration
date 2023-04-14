"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const Footer_1 = __importDefault(require("../footer/Footer"));
const Header_1 = __importDefault(require("../header/Header"));
const MyCourses_1 = __importDefault(require("../myCourses/MyCourses"));
const SearchBar_1 = __importDefault(require("../searchBar/SearchBar"));
const SemSelector_1 = __importDefault(require("../semSelector/SemSelector"));
require("./CoursesPage.css");
function CoursesPage() {
    const [semVal, setSemVal] = (0, react_2.useState)({ semVal: "All" });
    const [input, setInput] = (0, react_2.useState)("");
    const [mySelectedCourses, setMySelectedCourses] = (0, react_2.useState)(() => JSON.parse(localStorage.getItem("myCourses") || "[]"));
    const myTotalCourses = (0, react_2.useMemo)(() => JSON.parse(localStorage.getItem("myCourses") || "[]"), []);
    function handleSemVal(e) {
        if (!e)
            return;
        console.log("res is  " + typeof e.target.value);
        setSemVal({ semVal: e.target.value });
        let myCourses = myTotalCourses;
        if (e.target.value === "All")
            setMySelectedCourses(myCourses);
        else {
            myCourses = myCourses?.filter((course) => course.sem === e.target.value);
            setMySelectedCourses(myCourses);
        }
    }
    function handleInputChange(e) {
        if (!e)
            return;
        setInput(e.target.value);
        let res = myTotalCourses?.filter((course) => {
            return ((course.sem === semVal.semVal || semVal.semVal === "All") &&
                course?.courseName
                    ?.toLowerCase()
                    .includes(e?.target.value?.toLowerCase()));
        });
        setMySelectedCourses(res);
    }
    const links = (0, react_2.useMemo)(() => ["Registration", "Admin"], []);
    return (react_1.default.createElement("div", { className: "flex wrapper " },
        react_1.default.createElement(Header_1.default, { name: "My Courses", userName: "Sainath", links: links }),
        react_1.default.createElement("div", { className: "flex sem-selector-and-search-bar" },
            react_1.default.createElement(SemSelector_1.default, { semVal: semVal.semVal, handleSemVal: handleSemVal }),
            react_1.default.createElement(SearchBar_1.default, { input: input, handleInputChange: handleInputChange })),
        react_1.default.createElement("div", { className: "my-courses" },
            react_1.default.createElement(MyCourses_1.default, { myCourses: mySelectedCourses })),
        react_1.default.createElement("div", { className: "footer" },
            react_1.default.createElement(Footer_1.default, null))));
}
exports.default = CoursesPage;
