import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Blog Component tests", () => {
  //   let container;

  test("blog renders only title and author initially", () => {
    //
    const blog = {
      title: "here is a title",
      author: "author1",
      url: "url.com",
      likes: "10",
    };

    render(<Blog blog={blog} />);
    const div = screen.getByTestId("testDiv");

    expect(screen.getByText(/here is a title/i)).toBeVisible();
    expect(screen.getByText(/author1/i)).toBeVisible();

    expect(screen.queryByText(/url.com/i)).not.toBeVisible();
    expect(screen.queryByText(/likes: 10/i)).not.toBeVisible();

    screen.debug();
  });

  test("blog and url are shown when button is clicked", async () => {
    const blog = {
      title: "here is a title",
      author: "author1",
      url: "url.com",
      likes: "10",
    };

    const mockHandler = vi.fn();
    render(<Blog blog={blog} />);
    const user = userEvent.setup();

    const button = screen.getByText("view");

    expect(screen.queryByText(/url.com/i)).not.toBeVisible();
    expect(screen.queryByText(/likes: 10/i)).not.toBeVisible();

    await user.click(button);
    expect(screen.queryByText(/url.com/i)).toBeVisible();
    expect(screen.queryByText(/likes: 10/i)).toBeVisible();
  });
});
