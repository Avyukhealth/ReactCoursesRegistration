import React from "react";
import { useMemo, useReducer } from "react";
import "./CourseRegistrationPage.css";
import Event from "../../models/event";
import { Courses } from "../../models/courses";
import { CourseReducerObject } from "../../models/courseReducerObject";
import Course from "../../models/course";

// define types here 
export const CHNAGE_SEM_VALUE = "CHANGE_SEM_VALUE";
export const CHANGE_INPUT_VALUE = "CHANGE_INPUT_VALUE";
export const CHANGE_COURSES = "CHANGE_COURSES";
export const CHANGE_SELECTED_COURSES = "CHANGE_SELECTED_COURSES";
export const HANDLE_SEM_VAL = "HANDLE_SEM_VAL"
export const HANDLE_SELECTED_COURSES = "HANDLE_SELECTED_COURSES";
export const HANDLE_COURSE_SUBMIT = "HANDLE_COURSE_SUBMIT";
export const TOTAL_COURSES = "TOTAL_COURSES"
export const MY_COURSES = "MY_COURSES";
export const HANDLE_INPUT_CHANGE = "HANDLE_INPUT_CHANGE";

export const CourseRegistrationActionHandler = ({ children }: { children: any }) => {
  const onAction = (actionType: any, payload: any) => {
    switch (actionType) {
      case CHNAGE_SEM_VALUE:
        //here the payload is state
        return dispatch({ type: CHNAGE_SEM_VALUE, value: payload })
      case CHANGE_INPUT_VALUE:
        return dispatch({ type: CHANGE_INPUT_VALUE, value: payload })
      case CHANGE_COURSES:
        return dispatch({ type: CHANGE_COURSES, value: payload })
      case CHANGE_SELECTED_COURSES:
        return dispatch({ type: CHANGE_SELECTED_COURSES, value: payload })
      case HANDLE_SEM_VAL:
        // here payload is {e:Event | null} 
        return handleSemVal(payload.e)
      case HANDLE_SELECTED_COURSES:
        return handleSelectCourses(payload.courseId, payload.response)
      case HANDLE_COURSE_SUBMIT:
        return handleCoursesSubmit();
      case TOTAL_COURSES:
        return totalCourses;
      case HANDLE_INPUT_CHANGE:
        return handleInputChange(payload.e);
      case MY_COURSES:
        return myCoursesFromStorage;
    }
  }

  function reducer(state: CourseReducerObject, action: any) { // arrow function, action is an object of type and payload
    switch (action.type) {
      case CHANGE_SELECTED_COURSES:
        return { ...state, selectedCourses: action.value };

      case CHANGE_INPUT_VALUE:
        return { ...state, input: action.value };

      case CHNAGE_SEM_VALUE:
        return { ...state, semVal: action.value };

      case CHANGE_COURSES:
        return { ...state, courses: action.value };

      default:
        throw new Error("Unsupported Operation on reducer");
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    semVal: "None",
    input: "",
    courses: [],
    selectedCourses: [],
  });

  const totalCourses = useMemo<Courses>(
    () => JSON.parse(localStorage.getItem("allCourses") || "[]"),
    []
  ); // move to container
  const myCoursesFromStorage = useMemo<Courses>(
    () => JSON.parse(localStorage.getItem("myCourses") || "[]"),
    []
  ); // move to container

  function handleSemVal(e: Event | null) { // move to actionHandler
    if (!e) return;
    let myTotalCourses = myCoursesFromStorage;
    let enrolled = false;
    myTotalCourses?.forEach((course) => {
      if (course.sem === e?.target?.value) enrolled = true;
    });

    if (enrolled) {
      alert("sem is already enrolled");
    } else {
      const res = totalCourses?.filter((course) => {
        return (
          (course.sem === e?.target?.value || e?.target?.value === "All") &&
          course?.courseName?.toLowerCase().includes(state.input.toLowerCase())
        );
      });
      dispatch({ type: CHNAGE_SEM_VALUE, value: e?.target.value });
      dispatch({ type: CHANGE_COURSES, value: res });
    }
  }

  function handleInputChange(e: Event | null) { // move to actionHandler / container
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
    dispatch({ type: CHANGE_INPUT_VALUE, value: e?.target?.value });
    dispatch({ type: CHANGE_COURSES, value: res });
  }

  function handleSelectCourses(courseId: string, response: string) {
    if (response?.toLowerCase().includes("yes")) {
      console.log("selected with courseid : ", courseId)
      let res: Courses = JSON.parse(localStorage.getItem("allCourses") || "[]");
      console.log(res)
      res = res?.filter((course) => course.courseId.toString() === courseId.toString());
      console.log(res)
      dispatch({
        type: CHANGE_SELECTED_COURSES,
        value: [...state.selectedCourses, ...res],
      });
    } else {
      let res = state.selectedCourses;
      res = res?.filter((course: Course) => course.courseId !== courseId);
      dispatch({ type: CHANGE_SELECTED_COURSES, value: res });
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
    dispatch({ type: CHNAGE_SEM_VALUE, value: "All" });
  }

  return <>
    {children({ state, onAction })}
  </>
}