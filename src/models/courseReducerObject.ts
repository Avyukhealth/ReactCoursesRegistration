import Course from "./course";

export type CourseReducerObject = {
  semVal: string;
  input: string;
  courses: Course[];
  selectedCourses: Course[];
};
