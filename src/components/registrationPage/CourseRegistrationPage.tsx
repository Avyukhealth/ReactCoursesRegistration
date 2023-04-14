import React from "react";
import { useMemo, useReducer } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SearchBar from "../searchBar/SearchBar";
import SemSelector from "../semSelector/SemSelector";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./CourseRegistrationPage.css";
import CustomTable from "../table/Table";
import Event from "../../models/event";
import { Courses } from "../../models/courses";
import { CourseReducerObject } from "../../models/courseReducerObject";
import Course from "../../models/course";

const actionTypes: {
  CHNAGE_SEM_VALUE: string,
  CHANGE_INPUT_VALUE: string,
  CHANGE_COURSES: string,
  CHANGE_SELECTED_COURSES: string,
} = {
  CHNAGE_SEM_VALUE: "CHANGE_SEM_VALUE",
  CHANGE_INPUT_VALUE: "CHANGE_INPUT_VALUE",
  CHANGE_COURSES: "CHANGE_COURSES",
  CHANGE_SELECTED_COURSES: "CHANGE_SELECTED_COURSES",
};

function reducer(state: CourseReducerObject, action: any) {
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

export default function CourseRegistration() {
  const [state, dispatch] = useReducer(reducer, {
    semVal: "None",
    input: "",
    courses: [],
    selectedCourses: [],
  });

  const totalCourses = useMemo<Courses>(
    () => JSON.parse(localStorage.getItem("allCourses") || "[]"),
    []
  );
  const myCoursesFromStorage = useMemo<Courses>(
    () => JSON.parse(localStorage.getItem("myCourses") || "[]"),
    []
  );

  function handleSemVal(e: Event | null) {
    if (!e) return;
    let myTotalCourses = myCoursesFromStorage;
    let enrolled = false;
    myTotalCourses?.forEach((course) => {
      if (course.sem === e?.target?.value) enrolled = true;
    });

    if (enrolled) {
      alert("sem is already enrolled");
    } else {
      let res = totalCourses;
      let temp = totalCourses?.filter((course) => {
        return (
          (course.sem === e?.target?.value || e?.target?.value === "All") &&
          course?.courseName?.toLowerCase().includes(state.input.toLowerCase())
        );
      });
      res = temp;
      dispatch({ type: actionTypes.CHNAGE_SEM_VALUE, value: e?.target.value });
      dispatch({ type: actionTypes.CHANGE_COURSES, value: res });
    }
  }

  function handleInputChange(e: Event | null) {
    if (!e) return;
    const input = e?.target.value;
    let temp = totalCourses?.filter((course) => {
      return (
        (course.sem === state.semVal || state.semVal === "All") &&
        course?.courseName?.toLowerCase().includes(input?.toLowerCase())
      );
    });
    let res = totalCourses;
    res = temp;
    dispatch({ type: actionTypes.CHANGE_INPUT_VALUE, value: e?.target?.value });
    dispatch({ type: actionTypes.CHANGE_COURSES, value: res });
  }

  function handleSelectCourses(courseId: string, response: string) {


    if (response?.toLowerCase().includes("yes")) {
      console.log("selected with courseid : ", courseId)
      let res: Courses = JSON.parse(localStorage.getItem("allCourses") || "[]");
      console.log(res)
      res = res?.filter((course) => course.courseId.toString() === courseId.toString());
      console.log(res)
      dispatch({
        type: actionTypes.CHANGE_SELECTED_COURSES,
        value: [...state.selectedCourses, ...res],
      });
    } else {
      let res = state.selectedCourses;
      res = res?.filter((course: Course) => course.courseId !== courseId);
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
    else alert("Registration Successful");
    dispatch({ type: actionTypes.CHNAGE_SEM_VALUE, value: "All" });
  }

  const links = useMemo(() => ["MyCourses", "Admin"], []);

  return (
    <div className="flex wrapper">
      <Header name="Course Registration" userName="Sainath" links={links} />
      <div className="flex sem-selector-and-search-bar">
        <SemSelector semVal={state.semVal} handleSemVal={handleSemVal} />
        <SearchBar input={state.input} handleInputChange={handleInputChange} />
      </div>
      <div className="courses-table">
        <CustomTable
          handleSelectCourses={handleSelectCourses}
          courses={state.courses}
        />
      </div>
      <div className="courses-submit-button">
        <SubmitButton handleCoursesSubmit={handleCoursesSubmit} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
