import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../custom-hooks/useGetDataFromLocalStorage";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MyCourses from "../my-courses/MyCourses";
import SearchBar from "../search-bar/SearchBar";
import SemSelector from "../sem-selector/SemSelector";
import "./CoursesPage.css";

import Test from "../Test";
/*
<Header {headerName} {links}/>
<SemSelector {semVal}/>
<SearchBar {input}/>
<Courses {inputcoursesdetails} />    -> <CourseDetails {courseDetails} />
<Footer/>
*/

export default function CoursesPage() {
  const [semVal, setSemVal] = useState("All");
  const [input, setInput] = useState(() => "");
  const [mySelectedCourses, setMySelectedCourses] = useState(() =>
    JSON.parse(localStorage.getItem("myCourses"))
  );

  useEffect(() => {
    // Filter course using semVal and input and assign them to mySelectedCourses

    let res = JSON.parse(localStorage.getItem("myCourses"));

    res = res.filter((course) => course.sem === semVal || semVal === "All");

    res = res.filter((course) =>
      course.courseName.toLowerCase().includes(input.toLowerCase())
    );

    setMySelectedCourses(res);
  }, [semVal, input]);

  function handleSemVal(e) {
    setSemVal(e.target.value);
    // set selected courses acc to them
    let myCourses = JSON.parse(localStorage.getItem("myCourses"));

    if (e.target.value == "All") setMySelectedCourses(myCourses);
    else {
      myCourses = myCourses.filter((course) => course.sem == e.target.value);
      setMySelectedCourses(myCourses);
    }
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className="flex wrapper">
      <Header
        name="My Courses"
        links={["Registration", "Admin"]}
        userName="Sainath"
        userIcon="userIcon"
      />

      <div className="flex sem-selector-and-search-bar">
        <SemSelector semVal={semVal} handleSemVal={handleSemVal} />
        <SearchBar input={input} handleInputChange={handleInputChange} />
      </div>

      {/* we need to make a component to courses and Course */}
      <MyCourses myCourses={mySelectedCourses} />

      <Footer />
    </div>
  );
}
