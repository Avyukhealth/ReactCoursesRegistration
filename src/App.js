import { useState } from "react";
import AdminPage from "./components/adminPage/AdminPage";
import CourseRegistrationPage from "./components/registrationPage/CourseRegistrationPage";
import CoursesPage from "./components/coursesPage/CoursesPage";
import "./App.css";
import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  const [theme, setTheme] = useState("light");

  function handleTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  return (
    <div className="app" data-testid="app" data-theme={theme}>
      <div className="Routes">
        <Router>
          <Routes path="/">
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
