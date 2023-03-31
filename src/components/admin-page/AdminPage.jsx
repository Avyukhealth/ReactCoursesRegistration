import React, { useEffect, useState } from "react";
import AddCourse from "../add-course/AddCourse";
import AdminCustomTable from "../adminCustomTable/AdminCustomTable";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SearchBar from "../search-bar/SearchBar";
import CustomTable from "../table/Table";
import Table from "../table/Table";
import "./AdminPage.css";

export default function AdminPage() {
  const [allCourses, setAllcourses] = useState(
    JSON.parse(localStorage.getItem("allCourses")) || {}
  );

  const [input, setInput] = useState("");

  useEffect(() => {
    let res = JSON.parse(localStorage.getItem("allCourses"));

    res = res.filter((course) =>
      course.courseName.toLowerCase().includes(input.toLowerCase())
    );
    setAllcourses(res);
  }, [input]);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className="flex wrapper">
      <Header
        name="Admin"
        links={["Registration", "MyCourses"]}
        userName="Sainath"
        userIcon="userIcon"
      />
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
