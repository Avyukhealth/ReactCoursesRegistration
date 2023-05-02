import React from "react";
import { useMemo } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SearchBar from "../searchBar/SearchBar";
import SemSelector from "../semSelector/SemSelector";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./CourseRegistrationPage.css";
import CustomTable from "../table/Table";
import { HANDLE_SELECTED_COURSES, HANDLE_COURSE_SUBMIT, HANDLE_SEM_VAL, HANDLE_INPUT_CHANGE } from './CourseRegistrationActionHandler';

export default function CourseRegistration({ state, onAction }: { state: any, onAction: any }) {
  const handleSemVal = (e: any) => onAction(HANDLE_SEM_VAL, { e });
  const handleSelectCourses = (courseId: any, response: any) => onAction(HANDLE_SELECTED_COURSES, { courseId, response })
  const handleCoursesSubmit = () => onAction(HANDLE_COURSE_SUBMIT, {});
  const handleInputChange = (e: any) => onAction(HANDLE_INPUT_CHANGE, { e })
  const links = useMemo(() => ["MyCourses", "Admin"], []);
  return (
    <div className="flex wrapper">
      <Header name="Course Registration" userName="Sainath" links={links} />
      <div className="flex sem-selector-and-search-bar">
        <SemSelector semVal={state.semVal} handleSemVal={handleSemVal} />
        <SearchBar input={state.input} handleInputChange={handleInputChange} />
      </div>
      <div className="courses-table">
        <CustomTable
          handleSelectCourses={handleSelectCourses}
          courses={state.courses}
        />
      </div>
      <div className="courses-fa-button">
        <SubmitButton handleCoursesSubmit={handleCoursesSubmit} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
