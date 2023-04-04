import React, { useState } from "react";
import AdminPage from "./components/admin-page/AdminPage";
import CourseRegistrationPage from "./components/registration-page/CourseRegistrationPage";
import CoursesPage from "./components/courses-page/CoursesPage";
import "./App.css";
import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  
  const [theme, setTheme] = useState("dark");

  return (
    <div data-theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<CourseRegistrationPage />} />
          <Route path="/myCourses" element={<CoursesPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/Registration" element={<CourseRegistrationPage />} />
        </Routes>
      </Router>
      <button
        onClick={() => {
          if (theme === "light") setTheme("dark");
          else setTheme("light");
        }}
        style={{
          width: "min-content",
          backgroundColor: theme === "dark" ? "black" : "#425e99",
          borderRadius: "10%",
          color: theme === "dark" ? "#f5a236" : "white",
          padding: "12px",
          position: "fixed",
          bottom: 10,
          left: 10,
        }}
        className="theme-button"
      >
        Change Theme
      </button>
    </div>
  );
}
