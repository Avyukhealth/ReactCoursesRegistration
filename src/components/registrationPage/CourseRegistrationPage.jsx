import { useMemo, useReducer } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SearchBar from "../searchBar/SearchBar";
import SemSelector from "../semSelector/SemSelector";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./CourseRegistrationPage.css";
import CustomTable from "../table/Table";

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

export default function CourseRegistration() {
  const [state, dispatch] = useReducer(reducer, {
    semVal: "None",
    input: "",
    courses: [],
    selectedCourses: [],
  });

  const totalCourses = useMemo(
    () => JSON.parse(localStorage.getItem("allCourses") ||  "[]"),
    []
  );
  const myCoursesFromStorage = useMemo(
    () => JSON.parse(localStorage.getItem("myCourses") || "[]"),
    []
  );

  function handleSemVal(e) {
    let myTotalCourses = myCoursesFromStorage;
    let enrolled = false;
    myTotalCourses?.forEach((course) => {
      if (course.sem === e?.target?.value) enrolled = true;
    });

    if (enrolled) {
      alert("sem is already enrolled");
    } else {
      let res = totalCourses;
      res = totalCourses?.filter((course) => {
        return (
          (course.sem === e?.target?.value || e?.target?.value === "All") &&
          course?.courseName?.toLowerCase().includes(state.input.toLowerCase())
        );
      });
      dispatch({ type: actionTypes.CHNAGE_SEM_VALUE, value: e?.target.value });
      dispatch({ type: actionTypes.CHANGE_COURSES, value: res });
    }
  }

  function handleInputChange(e) {
    const input = e?.target.value;
    let res = totalCourses?.filter((course) => {
      return (
        (course.sem === state.semVal || state.semVal === "All") &&
        course?.courseName?.toLowerCase().includes(input?.toLowerCase())
      );
    });
    dispatch({ type: actionTypes.CHANGE_INPUT_VALUE, value: e?.target?.value });
    dispatch({ type: actionTypes.CHANGE_COURSES, value: res });
  }

  function handleSelectCourses(courseId, response) {
    if (response?.toLowerCase().includes("yes")) {
      let res = JSON.parse(localStorage.getItem("allCourses"));
      res = res?.filter((course) => course.courseId === courseId);
      dispatch({
        type: actionTypes.CHANGE_SELECTED_COURSES,
        value: [...state.selectedCourses, ...res],
      });
    } else {
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
