import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";

//Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.
// Add CSS classes to the component to help the testing as necessary.
//

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
});
