import React from "react";
import AddCourse from "../add-course/AddCourse";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import SearchBar from "../search-bar/SearchBar";
import Table from "../table/Table";

/*
<Header {headerName} {links}/>
<AddCourse {courseDetails} />
<SubmitButton {courseDetails} />
<SearchBar />
<Table /> -> we get it from localStorage
<Footer />
*/

export default function AdminPage() {
  return (
    <div>
      <Header />
      <AddCourse />
      <SearchBar />
      <Table />
      <Footer />
    </div>
  );
}
