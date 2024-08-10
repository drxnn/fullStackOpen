import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Note from "./Notes";

// ...

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = vi.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("renders content", () => {
  const note = {
    content: "Does not work anymore :(",
    important: true,
  };

  render(<Note note={note} />);

  // exact false works if we dont want the exact same text, but a text that is contained in whatever component we are looking for
  const element = screen.getByText("Does not work anymore :(", {
    exact: false,
  });

  expect(element).toBeDefined();
});
