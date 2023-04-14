import React from "react";
import CourseComp from "../course/Course";
import "./MyCourses.css";
import { Courses } from '../../models/courses';


export default function MyCourses({ myCourses }: { myCourses: Courses }) {
  console.log(myCourses);
  return (
    <div className="flex my-courses-div">
      {myCourses?.map((course) => {
        return <CourseComp key={course.courseId} course={course} />;
      })}
    </div>
  );
}
