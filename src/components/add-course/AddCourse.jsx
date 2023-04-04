import React, { useState } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./AddCourse.css";

export default function AddCourse() {
  const initialObject = {
    courseName: "",
    credits: "",
    professor: "",
    limit: "",
    eligibility: "",
    sem: "",
  };
  // take all of the input into an object and submit it to localStorage
  const [course, SetCourse] = useState(initialObject);

  function handleChange(e) {
    let obj = {};
    let a = e.target.name,
      b = e.target.value;

    obj[a] = b;
    SetCourse({
      ...course,
      ...obj,
    });
  }

  function handleCoursesSubmit() {
    // update the course in localStorage and setCourse to empty
    let res = JSON.parse(localStorage.getItem("allCourses"));

    // id is max id + 1
    let id = 3424;
    let maxId = 1;
    JSON.parse(localStorage.getItem("allCourses"))?.map((course) => {
      maxId = Math.max(maxId, course?.courseId);
    });
    id = maxId + 1;
    res.push({ ...course, courseId: id });
    localStorage.setItem("allCourses", JSON.stringify(res));
    SetCourse(initialObject);
  }

  return (
    <div className="flex add-course-div">
      <div className="add-course-div-heading">
        <h3>Add Course</h3>
      </div>
      <input
        name="courseName"
        type="text"
        onChange={handleChange}
        value={course.courseName}
        placeholder="Enter Course Name"
      />
      <input
        name="credits"
        onChange={handleChange}
        type="number"
        value={course.credits}
        placeholder="Enter Credits"
      />
      <input
        name="professor"
        onChange={handleChange}
        type="text"
        value={course.professor}
        placeholder="Enter Professor"
      />
      <input
        name="limit"
        onChange={handleChange}
        type="text"
        value={course.limit}
        placeholder="Enter Limit"
      />
      <input
        name="eligibility"
        onChange={handleChange}
        value={course.eligibility}
        type="text"
        placeholder="Enter Eligibility"
      />
      <input
        name="sem"
        onChange={handleChange}
        value={course.eligibility}
        type="text"
        placeholder="Enter Sem"
      />
      <SubmitButton handleCoursesSubmit={handleCoursesSubmit} />
    </div>
  );
}
