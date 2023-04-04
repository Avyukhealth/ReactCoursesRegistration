import React, { useEffect, useMemo, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SearchBar from "../search-bar/SearchBar";
import SemSelector from "../sem-selector/SemSelector";
import SubmitButton from "../SubmitButton/SubmitButton";
import CustomTable from "../table/Table";
import "./CourseRegistrationPage.css";

export default function CourseRegistration() {
  const [semVal, setSemVal] = useState("None");
  const [input, setInput] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState(() => []);
  
  const totalCourses = useMemo(
    () => JSON.parse(localStorage.getItem("allCourses")),
    []
  );
  
  useEffect(() => {
    let res = totalCourses;

    res = res?.filter((course) => {
      return (
        ((course.sem === semVal || semVal === "All") &&
          course?.courseName?.toLowerCase().includes(input.toLowerCase())) ||
        course?.professor?.toLowerCase().includes(input.toLowerCase()) ||
        course?.eligibility?.toLowerCase().includes(input.toLowerCase())
      );
    });

    setCourses(res);
  }, [semVal, input, totalCourses]);

  const myCoursesFromStorage = JSON.parse(localStorage.getItem("myCourses"));
  function handleSemVal(e) {
    //  if myCourses aleary have that sem then show alert
    let allCourses = myCoursesFromStorage;
    let enrolled = false;
    let selectedSem = e?.target?.value;
    allCourses.forEach((course) => {
      if (course.sem === selectedSem) enrolled = true;
    });
    if (enrolled) alert("Sem is already Enrolled");
    else setSemVal(e?.target?.value);
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  // when ever a courses is selected
  function handleSelectCourses(courseId, response) {
    if (response?.toLowerCase().includes("yes")) {
      let res = JSON.parse(localStorage.getItem("allCourses"));
      res = res.filter((course) => course.sem == semVal || semVal == "All");
      res = res.filter((course) => course.courseId == courseId);

      setSelectedCourses((selectedCourses) => {
        return [...res, ...selectedCourses];
      });
    } else {
      let res = selectedCourses;
      res = res.filter((course) => course.courseId !== courseId);
      setSelectedCourses({ ...res });
    }
  }

  function handleCoursesSubmit() {
    // update them to my Course
    if (semVal === "All") {
      alert("Cannot submit All Courses");
      return;
    }

    let res = JSON.parse(localStorage.getItem("myCourses"));

    // update the res with new courses
    res = [...res, ...selectedCourses];
    localStorage.setItem("myCourses", JSON.stringify(res));
    if (selectedCourses?.length == 0)
      alert("Please select courses to Register");
    else alert("Registration Successful");
  }

  //  styled comp for button
  return (
    <div className="flex wrapper">
      <Header
        name="Course Registration"
        links={["MyCourses", "Admin"]}
        userName="Sainath"
        userIcon="userIcon"
      />
      <div className="flex sem-selector-and-search-bar">
        <SemSelector semVal={semVal} handleSemVal={handleSemVal} />
        <SearchBar input={input} handleInputChange={handleInputChange} />
      </div>

      <CustomTable
        handleSelectCourses={handleSelectCourses}
        courses={courses}
      />
      <SubmitButton handleCoursesSubmit={handleCoursesSubmit} />
      <Footer />
    </div>
  );
}
