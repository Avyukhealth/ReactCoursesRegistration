import React from "react";
import Course from "../../models/course";
import './Course.css'

type CourseProps = {
  course: Course;
}

export default function CourseComp({ course }: CourseProps) {
  return (
    <div className="course-div">
      <p>{course.courseName}</p>
      <p>{course.credits}</p>
      <p>{course.professor}</p>
      <p>{course.sem}</p>
    </div>
  );
}
