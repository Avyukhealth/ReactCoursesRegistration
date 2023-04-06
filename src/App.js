import React, { useState } from "react";
import AdminPage from "./components/admin-page/AdminPage";
import CourseRegistrationPage from "./components/registration-page/CourseRegistrationPage";
import CoursesPage from "./components/courses-page/CoursesPage";
import "./App.css";
import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  const [theme, setTheme] = useState("dark");

  function handleTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  return (
    <div data-theme={theme}>
      <Router>
        <Routes path="/">
          <Route path="/myCourses" element={<CoursesPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/*" element={<CourseRegistrationPage />} />
        </Routes>
      </Router>
      <button onClick={handleTheme} className="theme-button-main">
        Change Theme
      </button>
    </div>
  );
}
