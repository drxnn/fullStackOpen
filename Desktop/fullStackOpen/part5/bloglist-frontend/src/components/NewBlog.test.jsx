import { render, screen } from "@testing-library/react";
import NewBlog from "./newBlog";

import { beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("New Blog Tests", () => {
  //

  test(" test should check, that the form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const newBlog = {
      title: "something",
      author: "someone",
      url: "somewhere",
    };
    const mockHandler = vi.fn();

    const setBlogsMock = vi.fn();
    const user = userEvent.setup();

    render(
      <NewBlog
        newBlog={newBlog}
        handleNewBlog={mockHandler}
        setNewBlog={setBlogsMock}
      />
    );

    const button = screen.getByTestId("submit-btn");
    const input = screen.getByPlaceholderText("input to get");
    await user.type(input, "input test");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(setBlogsMock.mock.calls[0][0].content).toBe("input test");
    screen.debug();
  });
});
