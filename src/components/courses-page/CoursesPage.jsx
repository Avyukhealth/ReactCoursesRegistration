import React, { useEffect, useMemo, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MyCourses from "../my-courses/MyCourses";
import SearchBar from "../search-bar/SearchBar";
import SemSelector from "../sem-selector/SemSelector";
import "./CoursesPage.css";

export default function CoursesPage() {
  const [semVal, setSemVal] = useState("All");
  const [input, setInput] = useState("");
  const [mySelectedCourses, setMySelectedCourses] = useState(() =>
    JSON.parse(localStorage.getItem("myCourses"))
  );

  const myTotalCourses = useMemo(
    () => JSON.parse(localStorage.getItem("myCourses")),
    []
  );

  useEffect(() => {
    let res = JSON.parse(localStorage.getItem("myCourses")) || [];
    setMySelectedCourses(res);
  }, []);

  function handleSemVal(e) {
    setSemVal(e.target.value);
    let myCourses = myTotalCourses;
    if (e.target.value === "All") setMySelectedCourses(myCourses);
    else {
      myCourses = myCourses?.filter((course) => course.sem === e.target.value);
      setMySelectedCourses(myCourses);
    }
  }

  function handleInputChange(e) {
    setInput(e.target.value);
    let res = myTotalCourses?.filter((course) => {
      return (
        (course.sem === semVal || semVal === "All") &&
        course?.courseName
          ?.toLowerCase()
          .includes(e?.target.value?.toLowerCase())
      );
    });
    setMySelectedCourses(res);
  }

  const links = useMemo(() => ["Registration", "Admin"], []);

  return (
    <div className="flex wrapper">
      <Header name="My Courses" userName="Sainath" links={links} />
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
