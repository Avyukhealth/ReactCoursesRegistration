import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./AddCourse.css";

export default function AddCourse() {
  // take all of the input into an object and submit it to localStorage
  const [course, SetCourse] = useState({
    courseName: "",
    credits: "",
    professor: "",
    limit: "",
    eligibility: "",
    sem: "",
    courseId: "",
  });

  function handle(e) {
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
    res.push(course);
    console.log("added");
    console.log(res);
    localStorage.setItem("allCourses", JSON.stringify(res));
    SetCourse({});
  }

  return (
    <div className="flex add-course-div">
      <h3>Add Course</h3>
      <input
        name="courseName"
        type="text"
        onChange={handle}
        value={course.courseName}
        placeholder="Enter Course Name"
      />
      <input
        name="credits"
        onChange={handle}
        type="number"
        value={course.credits}
        placeholder="Enter Credits"
      />
      <input
        name="professor"
        onChange={handle}
        type="text"
        value={course.professor}
        placeholder="Enter Professor"
      />
      <input
        name="limit"
        onChange={handle}
        type="text"
        value={course.limit}
        placeholder="Enter Limit"
      />
      <input
        name="eligibility"
        onChange={handle}
        value={course.eligibility}
        type="text"
        placeholder="Enter Eligibility"
      />
      <input name="sem" onChange={handle} type="text" placeholder="Enter Sem" />
      <input
        name="courseId"
        onChange={handle}
        type="text"
        placeholder="Enter CourseId"
      />
      <SubmitButton handleCoursesSubmit={handleCoursesSubmit} />
    </div>
  );
}
