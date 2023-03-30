import React, { useState } from "react";
import Footer from "../footer/Footer";
import Header, { Ul } from "../header/Header";
import SearchBar from "../search-bar/SearchBar";
import SemSelector from "../sem-selector/SemSelector";
import CustomTable from "../table/Table";

export default function CourseRegistration() {
  const [semVal, setSemVal] = useState("All");

  return (
    <>
      <Header
        name="Course Registration"
        links={["MyCourses", "Admin"]}
        userName="Sainath"
        userIcon="userIcon"
      />
      <SemSelector semVal={semVal} />
      <CustomTable />
    </>
  );
}
