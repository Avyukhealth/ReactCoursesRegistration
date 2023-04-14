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
const actionTypes = {
    CHNAGE_SEM_VALUE: "CHANGE_SEM_VALUE",
    CHANGE_INPUT_VALUE: "CHANGE_INPUT_VALUE",
    CHANGE_COURSES: "CHANGE_COURSES",
    CHANGE_SELECTED_COURSES: "CHANGE_SELECTED_COURSES",
};
function reducer(state, action) {
    switch (action.type) {
        case actionTypes.CHANGE_SELECTED_COURSES:
            return { ...state, selectedCourses: action.value };
        case actionTypes.CHANGE_INPUT_VALUE:
            return { ...state, input: action.value };
        case actionTypes.CHNAGE_SEM_VALUE:
            return { ...state, semVal: action.value };
        case actionTypes.CHANGE_COURSES:
            return { ...state, courses: action.value };
        default:
            throw new Error("Unsupported Operation on reducer");
    }
}
function CourseRegistration() {
    const [state, dispatch] = (0, react_2.useReducer)(reducer, {
        semVal: "None",
        input: "",
        courses: [],
        selectedCourses: [],
    });
    const totalCourses = (0, react_2.useMemo)(() => JSON.parse(localStorage.getItem("allCourses") || "[]"), []);
    const myCoursesFromStorage = (0, react_2.useMemo)(() => JSON.parse(localStorage.getItem("myCourses") || "[]"), []);
    function handleSemVal(e) {
        if (!e)
            return;
        let myTotalCourses = myCoursesFromStorage;
        let enrolled = false;
        myTotalCourses?.forEach((course) => {
            if (course.sem === e?.target?.value)
                enrolled = true;
        });
        if (enrolled) {
            alert("sem is already enrolled");
        }
        else {
            let res = totalCourses;
            let temp = totalCourses?.filter((course) => {
                return ((course.sem === e?.target?.value || e?.target?.value === "All") &&
                    course?.courseName?.toLowerCase().includes(state.input.toLowerCase()));
            });
            res = temp;
            dispatch({ type: actionTypes.CHNAGE_SEM_VALUE, value: e?.target.value });
            dispatch({ type: actionTypes.CHANGE_COURSES, value: res });
        }
    }
    function handleInputChange(e) {
        if (!e)
            return;
        const input = e?.target.value;
        let temp = totalCourses?.filter((course) => {
            return ((course.sem === state.semVal || state.semVal === "All") &&
                course?.courseName?.toLowerCase().includes(input?.toLowerCase()));
        });
        let res = totalCourses;
        res = temp;
        dispatch({ type: actionTypes.CHANGE_INPUT_VALUE, value: e?.target?.value });
        dispatch({ type: actionTypes.CHANGE_COURSES, value: res });
    }
    function handleSelectCourses(courseId, response) {
        if (response?.toLowerCase().includes("yes")) {
            console.log("selected with courseid : ", courseId);
            let res = JSON.parse(localStorage.getItem("allCourses") || "[]");
            console.log(res);
            res = res?.filter((course) => course.courseId.toString() === courseId.toString());
            console.log(res);
            dispatch({
                type: actionTypes.CHANGE_SELECTED_COURSES,
                value: [...state.selectedCourses, ...res],
            });
        }
        else {
            let res = state.selectedCourses;
            res = res?.filter((course) => course.courseId !== courseId);
            dispatch({ type: actionTypes.CHANGE_SELECTED_COURSES, value: res });
        }
    }
    function handleCoursesSubmit() {
        if (state.semVal === "All") {
            alert("Cannot submit All Courses");
            return;
        }
        let res = myCoursesFromStorage;
        res = [...res, ...state.selectedCourses];
        localStorage.setItem("myCourses", JSON.stringify(res));
        if (state.selectedCourses?.length === 0)
            alert("Please select courses to Register");
        else
            alert("Registration Successful");
        dispatch({ type: actionTypes.CHNAGE_SEM_VALUE, value: "All" });
    }
    const links = (0, react_2.useMemo)(() => ["MyCourses", "Admin"], []);
    return (react_1.default.createElement("div", { className: "flex wrapper" },
        react_1.default.createElement(Header_1.default, { name: "Course Registration", userName: "Sainath", links: links }),
        react_1.default.createElement("div", { className: "flex sem-selector-and-search-bar" },
            react_1.default.createElement(SemSelector_1.default, { semVal: state.semVal, handleSemVal: handleSemVal }),
            react_1.default.createElement(SearchBar_1.default, { input: state.input, handleInputChange: handleInputChange })),
        react_1.default.createElement("div", { className: "courses-table" },
            react_1.default.createElement(Table_1.default, { handleSelectCourses: handleSelectCourses, courses: state.courses })),
        react_1.default.createElement("div", { className: "courses-submit-button" },
            react_1.default.createElement(SubmitButton_1.default, { handleCoursesSubmit: handleCoursesSubmit })),
        react_1.default.createElement("div", { className: "footer" },
            react_1.default.createElement(Footer_1.default, null))));
}
exports.default = CourseRegistration;
