import React from "react";
import { useState } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./AddCourse.css";
import Event from "../../models/event";
import Course from "../../models/course";

function isCourseKey(key: string, course: Course): key is keyof Course {
  return key in Object.keys(course);
}



export default function AddCourse() {
  const initialObject = {
    courseName: "",
    credits: "",
    professor: "",
    limit: "",
    eligibility: "",
    sem: "",
    courseId: ""
  };
  const [course, SetCourse] = useState<Course>(initialObject);

  function handleChange(e: Event | null) {
    if (!e) return;
    let obj: Course = { ...course };
    if (typeof e.target.name !== 'string') return;
    if (typeof e.target.value !== 'string') return;

    let a: string = e.target.name;
    let b: string = e.target.value;
    if (!a || !b) return;
    if (isCourseKey(a, course)) {
      obj[a] = b;
      SetCourse({
        ...course,
        ...obj,
      });
    }
    else SetCourse(initialObject);
  }

  function handleCoursesSubmit() {
    if (
      course.courseName === "" ||
      course.credits === "" ||
      course.professor === "" ||
      course.limit === "" ||
      course.eligibility === "" ||
      course.sem === ""
    ) {
      alert("Fields cannot be empty");
      return;
    }

    let res = JSON.parse(localStorage.getItem("allCourses") || "[]");
    let id = 3424;
    let maxId = 1;
    JSON.parse(localStorage.getItem("allCourses") || "[]")?.forEach((course: Course) => {
      maxId = Math.max(maxId, Number(course?.courseId));
    });
    id = maxId + 1;
    res.push({ ...course, courseId: id });
    localStorage.setItem("allCourses", JSON.stringify(res));
    SetCourse(initialObject);
    alert("Course Submitted Successfully!");
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
        value={course.sem}
        type="text"
        placeholder="Enter Sem"
      />
      <SubmitButton handleCoursesSubmit={handleCoursesSubmit} />
    </div>
  );
}
