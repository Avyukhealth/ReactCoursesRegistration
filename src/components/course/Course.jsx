import "./Course.css"

export default function Course({ course }) {
  return (
    <div className="course-div">
      <p>{course.courseName}</p>
      <p>{course.credits}</p>
      <p>{course.professor}</p>
      <p>{course.sem}</p>
    </div>
  );
}
