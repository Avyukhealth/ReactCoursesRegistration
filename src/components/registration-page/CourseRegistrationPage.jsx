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
    console.log(res);
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
    if (response.toLowerCase().includes("yes")) {
      // add course id

      let res = JSON.parse(localStorage.getItem("allCourses"));
      console.log(res);
      res = res.filter((course) => course.sem === semVal);
      console.log(res);
      console.log("Acbd");
      res = res.filter((course) => course.courseId === courseId);
      setSelectedCourses({ ...selectedCourses, ...res });
      console.log("adding");
      console.log(res);
    } else {
      let res = selectedCourses;
      res = res.filter((course) => course.courseId !== courseId);
      setSelectedCourses({ ...res });
    }
  }

  function handleCoursesSubmit() {
    console.log("Selected courses are ");
    console.log(selectedCourses);
  }

  function fun(e) {
    console.log("fsadilfsalfslsaildjf")
    console.dir(e.target);
    e.preventDefault();
    handleSelectCourses(e.target.id, e.target.value);
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
        fun={fun}
      />

      <SubmitButton handleCoursesSubmit={handleCoursesSubmit} />
      <Footer />
    </div>
  );
}
