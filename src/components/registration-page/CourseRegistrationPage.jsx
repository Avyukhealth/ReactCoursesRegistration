import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocalStorage } from "../../custom-hooks/useGetDataFromLocalStorage";
import Footer from "../footer/Footer";
import Header, { Ul } from "../header/Header";
import SearchBar from "../search-bar/SearchBar";
import SemSelector from "../sem-selector/SemSelector";
import SubmitButton from "../SubmitButton/SubmitButton";
import CustomTable from "../table/Table";
import "./CourseRegistrationPage.css";

export default function CourseRegistration() {
  const [semVal, setSemVal] = useState("None");
  const [input, setInput] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    // fetch the data from localstorage and get the courses then filter by sem then by val
    let res = JSON.parse(localStorage.getItem("allCourses"));
    res = res?.filter(
      (course) =>
        (course.sem === semVal || semVal === "All") &&
        course.courseName.toLowerCase().includes(input.toLowerCase())
    );
    setCourses(res);
  }, [semVal, input]);

  function handleSemVal(e) {
    setSemVal(e?.target?.value);
    // now we need to change the courses according to the semester
  }

  function handleInputChange(e) {
    setInput(e.target.value);
    // also get the courses which are matching this input and set them to the courses
  }

  // when ever a courses is selected
  function handleSelectCourses(courseId, response) {
    console.log(courseId, " response is : " + response);
    let selectedCourses = null;
    // change selectd courses
  }

  function handleCoursesSubmit() {
    console.log(
      "submit courses Implementation is pending these are selected courses"
    );
    console.log(selectedCourses);
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

      {/* adding div is causing problems */}

      <CustomTable
        handleSelectCourses={handleSelectCourses}
        courses={courses}
      />

      <SubmitButton handleCoursesSubmit={handleCoursesSubmit} />
      <Footer />
    </div>
  );
}
