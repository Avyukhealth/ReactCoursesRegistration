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
        <Route path="/MyCourses" element={<CoursesPage/>} />
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
    // now select All option of the dropdown
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
        }, // Include the "Image Processing" course in the data
      ])
    );

    render(<MockCourseRegistration />);
    const dropdown = screen.getByTestId(/semval/i);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      expect(screen.getByText(/None/i)).toBeInTheDocument();
      // now select All option of the dropdown
      fireEvent.change(dropdown, { target: { value: "All" } });

      // now check weather there are courses or not
      expect(screen.getByText(/All/i)).toBeInTheDocument();

      // now the table loads data from local storage and we have to check weather there is image processing course or not
      expect(screen.getByText(/Image Processing/i)).toBeInTheDocument();
    });
  });

  test("renders AdminPage when /admin route is accessed", async () => {
    render(<MockCourseRegistration />);
    fireEvent.click(screen.getByRole("link", { name: /mycourses/i }));
    expect(screen.getByText(/My Courses/i)).toBeInTheDocument();
  });

  test("checking searchbar is working with table or not", async () => {
    render(<MockCourseRegistration />);
    // const searchbar = screen.getByPlaceholderText(/search/i);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(screen.getByPlaceholderText(/search.../i), "React");
    });

    // now it should be there in the table or no items should be there on the
    // get the table data  from DOM
  });

  test("checking searchbar is showing the user input", async () => {
    render(<MockCourseRegistration />);
    // const searchbar = screen.getByPlaceholderText(/search/i);
    // act(()=> userEvent.type(screen.getByPlaceholderText(/search.../i), "React"));
    // userEvent.type(screen.getByPlaceholderText(/search.../i), "React");
    fireEvent.change(screen.getByPlaceholderText(/search.../i), {
      target: { value: "React" },
    });
    expect(screen.getByPlaceholderText(/search.../i)).toHaveValue("React");
  });

  test("checking submit button is workign or not", async () => {
    render(<MockCourseRegistration />);
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    // now check weather we are getting alert of Please select courses to Register or not
    expect(alert).toHaveBeenCalledWith("Please select courses to Register");

    // expect(screen.getByRole("alert")).toHaveTextContent(
    //   "Please "
    // );
  });

  test("Checking weather footer renders or not", () => {
    render(<MockCourseRegistration />);
    const linkElement = screen.getByText(/Copyrights/i);
    expect(linkElement).toBeInTheDocument();
  });
});
