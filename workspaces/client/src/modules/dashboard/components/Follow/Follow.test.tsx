import type { Props } from "./Follow";

import { render, screen, fireEvent } from "@testing-library/react";
import Follow from "./Follow";

const mockHandleClick = jest.fn();

const props: Props = {
  isFollowing: false,
  onFollow: mockHandleClick,
};

describe("Follow Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("must show following text if is following", () => {
    props.isFollowing = true;
    render(<Follow {...props} />);

    screen.getByText("Following");
  });

  test("must show follow text if its no following", () => {
    props.isFollowing = false;
    render(<Follow {...props} />);

    screen.getByText("Follow");
  });

  test("clicking the follow button calls event handler once", () => {
    render(<Follow {...props} />);
    const followButton: HTMLButtonElement = screen.getByRole("button");

    fireEvent.click(followButton);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  test("must show loading component and disabled button if is loading", () => {
    props.isFollowing = false;

    render(<Follow {...props} />);
    const followButton = screen.getByRole<HTMLButtonElement>("button");

    expect(followButton.disabled).toBeTruthy();
    screen.getByText("Loading...");
  });

  test("should not show the loading and buttons should be available to click if not loading", () => {
    props.isFollowing = false;

    render(<Follow {...props} />);
    const followButton = screen.getByRole<HTMLButtonElement>("button");

    expect(followButton.disabled).not.toBeTruthy();
    expect(screen.queryByText("Loading...")).toBeFalsy();
  });
});
