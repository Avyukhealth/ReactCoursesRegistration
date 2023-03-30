import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MyCourses from "../my-courses/MyCourses";
import SearchBar from "../search-bar/SearchBar";
import SemSelector from "../sem-selector/SemSelector";

/*
<Header {headerName} {links}/>
<SemSelector {semVal}/>
<SearchBar {input}/>
<Courses {inputcoursesdetails} />    -> <CourseDetails {courseDetails} />
<Footer/>
*/

export default function CoursesPage() {
  return (
    <div>
      <Header />
      <SemSelector />
      <SearchBar />
      <MyCourses />
      <Footer />
    </div>
  );
}
