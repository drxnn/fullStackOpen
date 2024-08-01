import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Blog Component tests", () => {
  let blog;
  beforeEach(() => {
    blog = {
      title: "here is a title",
      author: "author1",
      url: "url.com",
      likes: "10",
    };
  });

  test("blog renders only title and author initially", () => {
    render(<Blog blog={blog} />);
    const div = screen.getByTestId("testDiv");

    expect(screen.getByText(/here is a title/i)).toBeVisible();
    expect(screen.getByText(/author1/i)).toBeVisible();

    expect(screen.queryByText(/url.com/i)).not.toBeVisible();
    expect(screen.queryByText(/likes: 10/i)).not.toBeVisible();

    screen.debug();
  });

  test("blog and url are shown when button is clicked", async () => {
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

  test("is like button is clicked twice, like handler was also called twice ", async () => {
    const blogTest = {
      title: "here is a title",
      author: "author1",
      url: "url.com",
      likes: "10",
    };
    const mockHandler = vi.fn();

    render(<Blog blog={blogTest} handleLikeBlog={mockHandler} />);
    const user = userEvent.setup();
    const button = screen.getByTestId("like-btn");

    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
    screen.debug();
  });
});
