import React, { useEffect, useMemo, useState } from "react";
import AddCourse from "../add-course/AddCourse";
import AdminCustomTable from "../adminCustomTable/AdminCustomTable";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SearchBar from "../search-bar/SearchBar";
import "./AdminPage.css";

export default function AdminPage() {
  const [allCourses, setAllcourses] = useState(
    () => JSON.parse(localStorage.getItem("allCourses")) || []
  );

  const [input, setInput] = useState("");
  const totalCoursesFromLocalStorage = useMemo(
    () => JSON.parse(localStorage.getItem("allCourses")),
    []
  );
  useEffect(() => {
    let res = totalCoursesFromLocalStorage;

    res = res?.filter((course) => {
      return (
        course?.courseName?.toLowerCase().includes(input.toLowerCase()) ||
        course?.professor?.toLowerCase().includes(input.toLowerCase()) ||
        course?.eligibility?.toLowerCase().includes(input.toLowerCase())
      );
    });
    setAllcourses(res);
  }, [input, totalCoursesFromLocalStorage]);

  function handleInputChange(e) {
    setInput(e.target.value);
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

  return (
    <div className="flex wrapper">
      <Header headerProps={headerProps} />
      <div className="flex add-course-and-courses-table-div">
        <div className="add-courses-component-div">
          <AddCourse />
        </div>

        <div className="flex table-and-search-bar">
          <div className="flex table-heading-and-search-bar">
            <div className="table-heading">
              <h3>Add Course</h3>
            </div>
            <div className="table-search-bar">
              <SearchBar handleInputChange={handleInputChange} />
            </div>
          </div>

          <div className="custom-table-details">
            <AdminCustomTable courses={allCourses} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
