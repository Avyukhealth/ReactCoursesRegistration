import { CssOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // fetch the data from localstorage and get the courses then filter by sem then by val
    let res = JSON.parse(localStorage.getItem("allCourses"));
    res = res?.filter(
      (course) =>
        (course.sem === semVal || semVal === "All") &&
        course.courseName?.toLowerCase().includes(input?.toLowerCase())
    );
    setCourses(res);
  }, [semVal, input]);

  function handleSemVal(e) {
    //  if myCourses aleary have that sem then show alert
    let allCourses = JSON.parse(localStorage.getItem("myCourses"));
    let enrolled = false;
    let selectedSem = e?.target?.value;
    allCourses.map((course) => {
      if (course.sem == selectedSem) enrolled = true;
    });
    if (enrolled) alert("Sem is already Enrolled");
    else setSemVal(e?.target?.value);
    // now we need to change the courses according to the semester
  }

  function handleInputChange(e) {
    setInput(e.target.value);
    // also get the courses which are matching this input and set them to the courses
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
    let res = JSON.parse(localStorage.getItem("myCourses"));

    // update the res with new courses
    res = [...res, ...selectedCourses];
    localStorage.setItem("myCourses", JSON.stringify(res));
    if (selectedCourses?.length == 0) alert("Please select courses to Register");
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
