import React from "react";
import { useMemo, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MyCourses from "../myCourses/MyCourses";
import SearchBar from "../searchBar/SearchBar";
import SemSelector from "../semSelector/SemSelector";
import "./CoursesPage.css";
import { Courses } from "../../models/courses";
import Event from "../../models/event";
import Sem from '../../models/sem';

export default function CoursesPage() {
  const [semVal, setSemVal] = useState<Sem>({ semVal: "All" });
  const [input, setInput] = useState<string>("");
  const [mySelectedCourses, setMySelectedCourses] = useState<Courses>(() =>
    JSON.parse(localStorage.getItem("myCourses") || "[]")
  );

  const myTotalCourses = useMemo<Courses>(
    () => JSON.parse(localStorage.getItem("myCourses") || "[]"),
    []
  );

  function handleSemVal(e: Event | null) {
    if (!e) return;
    console.log("res is  " + typeof e.target.value)
    setSemVal({ semVal: e.target.value });
    let myCourses = myTotalCourses;
    if (e.target.value === "All") setMySelectedCourses(myCourses);
    else {
      myCourses = myCourses?.filter((course) => course.sem === e.target.value);
      setMySelectedCourses(myCourses);
    }
  }

  function handleInputChange(e: Event | null) {
    if (!e) return;
    setInput(e.target.value);
    let res = myTotalCourses?.filter((course) => {
      return (
        (course.sem === semVal.semVal || semVal.semVal === "All") &&
        course?.courseName
          ?.toLowerCase()
          .includes(e?.target.value?.toLowerCase())
      );
    });
    setMySelectedCourses(res);
  }

  const links = useMemo(() => ["Registration", "Admin"], []);

  return (
    <div className="flex wrapper ">
      <Header name="My Courses" userName="Sainath" links={links} />
      <div className="flex sem-selector-and-search-bar">
        <SemSelector semVal={semVal.semVal} handleSemVal={handleSemVal} />
        <SearchBar input={input} handleInputChange={handleInputChange} />
      </div>
      <div className="my-courses">
        <MyCourses myCourses={mySelectedCourses} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
