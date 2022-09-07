import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import type { FollowProps } from "@/dashboard/components/Follow";
import Follow from "@/dashboard/components/Follow";

import { promiseRejected, promiseResolved } from "@/dashboard/components/__mocks__";

describe("Follow component", () => {
  let props: FollowProps;

  beforeEach(() => {
    props = {
      isFollowing: true,
      onFollow: promiseResolved,
    };
  });

  it("should show 'Following' if entity is followed", () => {
    render(<Follow {...props} />);
    screen.getByText("Following");
  });

  it("should show 'Follow' if entity is not followed", () => {
    props.isFollowing = false;
    render(<Follow {...props} />);
    screen.getByText("Follow");
  });

  it("should show spinner and should disable button when click and load request", async () => {
    render(<Follow {...props} />);
    const followButton = screen.getByRole<HTMLButtonElement>("button");
    fireEvent.click(followButton);

    expect(followButton.disabled).toBeTruthy();
    screen.getByText("Loading...");

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    expect(followButton.disabled).not.toBeTruthy();
  });

  it("should change the text when clicked and the request is successful", async () => {
    render(<Follow {...props} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button"));

    screen.getByText("Following");
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    screen.getByText("Follow");

    cleanup();

    props.isFollowing = false;
    render(<Follow {...props} />);
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button"));

    screen.getByText("Follow");
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    screen.getByText("Following");
  });

  it("should keep text if clicked and request fails", async () => {
    props.onFollow = promiseRejected;
    render(<Follow {...props} />);

    fireEvent.click(screen.getByRole<HTMLButtonElement>("button"));

    screen.getByText("Following");
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    screen.getByText("Following");

    cleanup();

    props.isFollowing = false;
    props.onFollow = promiseRejected;
    render(<Follow {...props} />);

    fireEvent.click(screen.getByRole<HTMLButtonElement>("button"));

    screen.getByText("Follow");
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    screen.getByText("Follow");
  });
});
