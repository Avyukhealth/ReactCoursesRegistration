import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SearchBar from "../search-bar/SearchBar";
import SemSelector from "../sem-selector/SemSelector";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./CourseRegistrationPage.css";

const CustomTable = lazy(() => import("../table/Table"));

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
  // const [input, setInput] = useState("");
  const [selectedCourses, setSelectedCourses] = useState(() => []);

  const [state, dispatch] = useReducer(reducer, {
    semVal: "None",
    input: "",
    courses: [],
    selectedCourses: [],
  });

  const totalCourses = useMemo(
    () => JSON.parse(localStorage.getItem("allCourses")),
    []
  );

  // const totalCourses = JSON.parse(localStorage.getItem("allCourses"));

  useEffect(() => {
    let res = totalCourses;

    res = res?.filter((course) => {
      return (
        (course.sem === state.semVal || state.semVal === "All") &&
        course?.courseName?.toLowerCase().includes(state.input.toLowerCase())
      );
    });
    
    dispatch({ type: actionTypes.CHANGE_COURSES, value: res });
  }, [state.semVal, state.input, totalCourses]);

  const myCoursesFromStorage = JSON.parse(localStorage.getItem("myCourses"));

  function handleSemVal(e) {
    //  if myCourses aleary have that sem then show alert
    let allCourses = myCoursesFromStorage;
    let enrolled = false;
    allCourses?.forEach((course) => {
      if (course.sem === e?.target?.value) enrolled = true;
    });

    if (state.semVal !== "All")
      allCourses = allCourses?.filter((course) => course.sem === state.semVal);

    if (enrolled) {
      alert("sem is already enrolled");
    } else {
      // setstate.semVal(e?.target.value);
      dispatch({ type: actionTypes.CHNAGE_SEM_VALUE, value: e?.target.value });
      dispatch({ type: actionTypes.CHANGE_COURSES, value: allCourses });
      // setCourses(allCourses);
    }
  }

  function handleInputChange(e) {
    // setInput(e.target.value);
    dispatch({ type: actionTypes.CHANGE_INPUT_VALUE, value: e?.target?.value });
  }

  // when ever a courses is selected
  function handleSelectCourses(courseId, response) {
    if (response?.toLowerCase().includes("yes")) {
      let res = JSON.parse(localStorage.getItem("allCourses"));
      res = res?.filter(
        (course) => course.sem === state.semVal || state.semVal === "All"
      );
      res = res?.filter((course) => course.courseId === courseId);

      // setSelectedCourses((selectedCourses) => {
      //   return [...selectedCourses, ...res];
      // });
      dispatch({
        type: actionTypes.CHANGE_SELECTED_COURSES,
        value: [...selectedCourses, ...res],
      });
    } else {
      let res = state.selectedCourses;
      res = res?.filter((course) => course.courseId !== courseId);
      // setSelectedCourses({ ...res });
      dispatch({ type: actionTypes.CHANGE_SELECTED_COURSES, value: res });
    }
  }

  function handleCoursesSubmit() {
    // update them to my Course
    if (state.semVal === "All") {
      alert("Cannot submit All Courses");
      return;
    }

    let res = JSON.parse(localStorage.getItem("myCourses"));

    // update the res with new courses
    res = [...res, ...state.selectedCourses];
    localStorage.setItem("myCourses", JSON.stringify(res));
    if (state.selectedCourses?.length === 0)
      alert("Please select courses to Register");
    else alert("Registration Successful");
    // setstate.semVal("All");
    dispatch({ type: actionTypes.CHNAGE_SEM_VALUE, value: "All" });
  }

  const headerProps = useMemo(
    () => ({
      name: "Course Registration",
      links: ["MyCourses", "Admin"],
      userName: "Sainath",
      userIcon: "userIcon",
    }),
    []
  );

  //  styled comp for button
  return (
    <div className="flex wrapper">
      <Header headerProps={headerProps} />
      <div className="flex sem-selector-and-search-bar">
        <SemSelector semVal={state.semVal} handleSemVal={handleSemVal} />
        <SearchBar input={state.input} handleInputChange={handleInputChange} />
      </div>

      <Suspense fallback={<div>Loading</div>}>
        <CustomTable
          handleSelectCourses={handleSelectCourses}
          courses={state.courses}
        />
      </Suspense>
      <SubmitButton handleCoursesSubmit={handleCoursesSubmit} />
      <Footer />
    </div>
  );
}
