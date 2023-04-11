import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App component", () => {
  test("renders CoursesPage by default", () => {
    render(<App />);
    expect(screen.getByText(/Course Registration/i)).toBeInTheDocument();
  });

  test("renders Courses Page when an  my courses is accessed", () => {
    render(<App />);
    let res = screen.getByRole("link", { name: /MyCourses/i });
    fireEvent.click(screen.getByRole("link", { name: /MyCourses/i }));
    console.log("abcd is : " +  res);
    expect(screen.getByText(/My Courses/i)).toBeInTheDocument();
  });

  test("renders AdminPage when /admin route is accessed", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /admin/i }));
    // userEvent.click(screen.getByRole("link", { name: /admin/i }));
    expect(screen.getByText(/admin panel/i)).toBeInTheDocument();
  });


  test("Checking weather footer renders or not", () => {
    render(<App />);
    const linkElement = screen.getByText(/Copyrights/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("changes theme when Change Theme button is clicked", () => {
    render(<App />);
    const themeButton = screen.getByRole("button", { name: /change theme/i });
    fireEvent.click(themeButton);
    // now the theme should change , first time change from light to dark
    const app = screen.getByTestId("app");
    const theme = app.getAttribute("data-theme");
    expect(theme).toBe("dark");
  });
});
