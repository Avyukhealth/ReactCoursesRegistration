import React from "react";
import Course from "../course/Course";
import "./MyCourses.css";

export default function MyCourses({ myCourses }) {
  return (
    <div className="flex my-courses-div">
      {myCourses?.map((course) => {
        return <Course key={course.courseId} course={course} />;
      })}
    </div>
  );
}
