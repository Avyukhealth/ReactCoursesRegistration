"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRegistrationActionHandler = exports.HANDLE_INPUT_CHANGE = exports.MY_COURSES = exports.TOTAL_COURSES = exports.HANDLE_COURSE_SUBMIT = exports.HANDLE_SELECTED_COURSES = exports.HANDLE_SEM_VAL = exports.CHANGE_SELECTED_COURSES = exports.CHANGE_COURSES = exports.CHANGE_INPUT_VALUE = exports.CHNAGE_SEM_VALUE = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
require("./CourseRegistrationPage.css");
// define types here 
exports.CHNAGE_SEM_VALUE = "CHANGE_SEM_VALUE";
exports.CHANGE_INPUT_VALUE = "CHANGE_INPUT_VALUE";
exports.CHANGE_COURSES = "CHANGE_COURSES";
exports.CHANGE_SELECTED_COURSES = "CHANGE_SELECTED_COURSES";
exports.HANDLE_SEM_VAL = "HANDLE_SEM_VAL";
exports.HANDLE_SELECTED_COURSES = "HANDLE_SELECTED_COURSES";
exports.HANDLE_COURSE_SUBMIT = "HANDLE_COURSE_SUBMIT";
exports.TOTAL_COURSES = "TOTAL_COURSES";
exports.MY_COURSES = "MY_COURSES";
exports.HANDLE_INPUT_CHANGE = "HANDLE_INPUT_CHANGE";
const CourseRegistrationActionHandler = ({ children }) => {
    // move to actionHandler and separate out Container component
    // onAction in actionhandler which will be returned {state and onAction}
    const onAction = (actionType, payload) => {
        switch (actionType) {
            case exports.CHNAGE_SEM_VALUE:
                //here the payload is state
                return dispatch({ type: exports.CHNAGE_SEM_VALUE, value: payload });
            case exports.CHANGE_INPUT_VALUE:
                return dispatch({ type: exports.CHANGE_INPUT_VALUE, value: payload });
            case exports.CHANGE_COURSES:
                return dispatch({ type: exports.CHANGE_COURSES, value: payload });
            case exports.CHANGE_SELECTED_COURSES:
                return dispatch({ type: exports.CHANGE_SELECTED_COURSES, value: payload });
            case exports.HANDLE_SEM_VAL:
                // here payload is {e:Event | null} 
                return handleSemVal(payload.e);
            case exports.HANDLE_SELECTED_COURSES:
                return handleSelectCourses(payload.courseId, payload.response);
            case exports.HANDLE_COURSE_SUBMIT:
                return handleCoursesSubmit();
            case exports.TOTAL_COURSES:
                return totalCourses;
            case exports.HANDLE_INPUT_CHANGE:
                return handleInputChange(payload.e);
            case exports.MY_COURSES:
                return myCoursesFromStorage;
        }
    };
    function reducer(state, action) {
        switch (action.type) {
            case exports.CHANGE_SELECTED_COURSES:
                return { ...state, selectedCourses: action.value };
            case exports.CHANGE_INPUT_VALUE:
                return { ...state, input: action.value };
            case exports.CHNAGE_SEM_VALUE:
                return { ...state, semVal: action.value };
            case exports.CHANGE_COURSES:
                return { ...state, courses: action.value };
            default:
                throw new Error("Unsupported Operation on reducer");
        }
    }
    const [state, dispatch] = (0, react_2.useReducer)(reducer, {
        semVal: "None",
        input: "",
        courses: [],
        selectedCourses: [],
    });
    const totalCourses = (0, react_2.useMemo)(() => JSON.parse(localStorage.getItem("allCourses") || "[]"), []); // move to container
    const myCoursesFromStorage = (0, react_2.useMemo)(() => JSON.parse(localStorage.getItem("myCourses") || "[]"), []); // move to container
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
            const res = totalCourses?.filter((course) => {
                return ((course.sem === e?.target?.value || e?.target?.value === "All") &&
                    course?.courseName?.toLowerCase().includes(state.input.toLowerCase()));
            });
            dispatch({ type: exports.CHNAGE_SEM_VALUE, value: e?.target.value });
            dispatch({ type: exports.CHANGE_COURSES, value: res });
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
        dispatch({ type: exports.CHANGE_INPUT_VALUE, value: e?.target?.value });
        dispatch({ type: exports.CHANGE_COURSES, value: res });
    }
    function handleSelectCourses(courseId, response) {
        if (response?.toLowerCase().includes("yes")) {
            console.log("selected with courseid : ", courseId);
            let res = JSON.parse(localStorage.getItem("allCourses") || "[]");
            console.log(res);
            res = res?.filter((course) => course.courseId.toString() === courseId.toString());
            console.log(res);
            dispatch({
                type: exports.CHANGE_SELECTED_COURSES,
                value: [...state.selectedCourses, ...res],
            });
        }
        else {
            let res = state.selectedCourses;
            res = res?.filter((course) => course.courseId !== courseId);
            dispatch({ type: exports.CHANGE_SELECTED_COURSES, value: res });
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
        dispatch({ type: exports.CHNAGE_SEM_VALUE, value: "All" });
    }
    return react_1.default.createElement(react_1.default.Fragment, null, children({ state, onAction }));
};
exports.CourseRegistrationActionHandler = CourseRegistrationActionHandler;
