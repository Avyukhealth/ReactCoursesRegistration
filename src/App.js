import React from "react";
import AdminPage from "./components/admin-page/AdminPage";
import CourseRegistrationPage from "./components/registration-page/CourseRegistrationPage";
import CoursesPage from "./components/courses-page/CoursesPage";
import "./App.css";
import { Link, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routs } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CourseRegistrationPage />} />
          <Route path="/myCourses" element={<CoursesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}
