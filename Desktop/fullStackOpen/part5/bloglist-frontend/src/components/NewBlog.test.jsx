import { render, screen } from "@testing-library/react";
import NewBlog from "./newBlog";

import { beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("New Blog Tests", () => {
  //

  test(" test should check, that the form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const newBlog = {
      title: "input test",
      author: "author test",
      url: "url test",
    };
    const mockHandler = vi.fn().mockImplementation((e) => {
      e.preventDefault();
    });

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
    const titleInput = screen.getByTestId("title-input");
    const authorInput = screen.getByTestId("author-input");
    const urlInput = screen.getByTestId("url-input");

    await user.type(titleInput, newBlog.title);
    await user.type(authorInput, newBlog.author);
    await user.type(urlInput, newBlog.url);
    await user.click(button);

    expect(mockHandler).toHaveBeenCalled();

    const mockCall = mockHandler.mock.calls[0][0];
    const formElement = mockCall.target;
    expect(formElement.elements.Title.value).toBe(newBlog.title);
    expect(formElement.elements.Author.value).toBe(newBlog.author);
    expect(formElement.elements.Url.value).toBe(newBlog.url);

    screen.debug();
  });
});
