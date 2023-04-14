import React, { useState } from 'react';
import AdminPage from "./components/adminPage/AdminPage";
import CourseRegistrationPage from "./components/registrationPage/CourseRegistrationPage";
import CoursesPage from "./components/coursesPage/CoursesPage";
import "./App.css";
import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Theme from "./models/theme";

export default function App() {
  const [theme, setTheme] = useState<Theme>({ themeVal: "light" });
  function handleTheme() {
    console.log("inside")
    if (theme.themeVal === "light") setTheme({ themeVal: "dark" });
    else setTheme({ themeVal: "light" });
  }

  return (
    <div className="app" data-testid="app" data-theme={theme.themeVal}>
      <div className="Routes">
        <Router>
          <Routes >
            <Route path="/myCourses" element={<CoursesPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/*" element={<CourseRegistrationPage />} />
          </Routes>
        </Router>
      </div>
      <div className="theme-button">
        <button onClick={handleTheme} className="theme-button-main">
          Change Theme
        </button>
      </div>
    </div>
  );
}
