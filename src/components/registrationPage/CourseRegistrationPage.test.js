/* eslint-disable testing-library/no-debugging-utils */
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseRegistration from "./CourseRegistrationPage";
import { MemoryRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import AdminPage from "../adminPage/AdminPage";
import CoursesPage from "../coursesPage/CoursesPage";

export default function MockCourseRegistration() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes path="/">
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/MyCourses" element={<CoursesPage />} />
        <Route path="*" element={<CourseRegistration />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Testing CourseRegistrationPage component", () => {
  test("rendering of Course Registration", () => {
    render(<MockCourseRegistration />);
    expect(screen.getByText(/Course Registration/i)).toBeInTheDocument();
  });

  test("checking the dropdown is working or not", async () => {
    render(<MockCourseRegistration />);
    const dropdown = screen.getByTestId(/semval/i);
    expect(screen.getByText(/None/i)).toBeInTheDocument();
    fireEvent.change(dropdown, { target: { value: "All" } });
    expect(screen.getByText(/All/i)).toBeInTheDocument();
  });

  test("checking the dropdown is working with table or not", async () => {
    localStorage.setItem(
      "allCourses",
      JSON.stringify([
        {
          courseName: "Image Processing",
          credits: "4",
          professor: "Trilok Panth",
          sem: "1",
          eligibility: "CSE",
          limit: "50",
          courseId: "2",
        },
      ])
    );

    render(<MockCourseRegistration />);
    const dropdown = screen.getByTestId(/semval/i);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      expect(screen.getByText(/None/i)).toBeInTheDocument();
      fireEvent.change(dropdown, { target: { value: "All" } });
      expect(screen.getByText(/All/i)).toBeInTheDocument();
      expect(screen.getByText(/Image Processing/i)).toBeInTheDocument();
    });
  });

  test("renders AdminPage when /admin route is accessed", async () => {
    render(<MockCourseRegistration />);
    fireEvent.click(screen.getByRole("link", { name: /mycourses/i }));
    screen.debug();
    expect(screen.getByText(/My Courses/i)).toBeInTheDocument();
  });

  test("checking searchbar is working with table or not", async () => {
    render(<MockCourseRegistration />);
    localStorage.setItem(
      "allCourses",
      JSON.stringify([
        {
          courseName: "Image Processing",
          credits: "4",
          professor: "Trilok Panth",
          sem: "1",
          eligibility: "CSE",
          limit: "50",
          courseId: "2",
        },
      ])
    );
    const dropdown = screen.getByTestId(/semval/i);
    fireEvent.change(dropdown, { target: { value: "All" } });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(screen.getByPlaceholderText(/search.../i), "Image");
    });

    screen.debug();
    expect(screen.getByText(/Image/i)).toBeInTheDocument();
  });

  // test("checking searchbar is showing the user input", async () => {
  //   render(<MockCourseRegistration />);
  //   fireEvent.change(screen.getByPlaceholderText(/search.../i), {
  //     target: { value: "React" },
  //   });
  //   expect(screen.getByPlaceholderText(/search.../i)).toHaveValue("React");
  // });

  test("checking submit button is working or not", async () => {
    render(<MockCourseRegistration />);
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    expect(alert).toHaveBeenCalledWith("Please select courses to Register");
  });

  test("Checking weather footer renders or not", () => {
    render(<MockCourseRegistration />);
    const linkElement = screen.getByText(/Copyrights/i);
    expect(linkElement).toBeInTheDocument();
  });
});
