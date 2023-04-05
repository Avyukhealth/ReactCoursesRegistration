import React, { useEffect, useMemo, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MyCourses from "../my-courses/MyCourses";
import SearchBar from "../search-bar/SearchBar";
import SemSelector from "../sem-selector/SemSelector";
import "./CoursesPage.css";

export default function CoursesPage() {
  const [semVal, setSemVal] = useState("All");
  const [input, setInput] = useState(() => "");
  const [mySelectedCourses, setMySelectedCourses] = useState(() =>
    JSON.parse(localStorage.getItem("myCourses"))
  );

  const myTotalCourses = useMemo(
    () => JSON.parse(localStorage.getItem("myCourses")),
    []
  );

  useEffect(() => {
    let res = myTotalCourses;

    res = res?.filter((course) => course.sem === semVal || semVal === "All");

    res = res?.filter(
      (course) =>
        course.courseName.toLowerCase().includes(input.toLowerCase()) ||
        course.professor.toLowerCase().includes(input.toLowerCase())
    );

    setMySelectedCourses(res);
  }, [semVal, input, myTotalCourses]);

  function handleSemVal(e) {
    setSemVal(e.target.value);
    // set selected courses acc to them
    let myCourses = myTotalCourses;

    if (e.target.value === "All") setMySelectedCourses(myCourses);
    else {
      myCourses = myCourses?.filter((course) => course.sem === e.target.value);
      setMySelectedCourses(myCourses);
    }
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  const headerProps = useMemo(() => ({
    name: "My Courses",
    links: ["Registration", "Admin"],
    userName: "Sainath",
    userIcon: "userIcon",
  }), []);

  return (
    <div className="flex wrapper">
      <Header headerProps={headerProps} />

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
