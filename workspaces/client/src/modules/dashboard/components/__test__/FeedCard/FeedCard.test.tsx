import type { Track } from "@br/core";

import { render, screen, cleanup, waitForElementToBeRemoved } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import FeedCard from "@/dashboard/components/FeedCard";
// import { PlayButtonWithOpacity } from "@/dashboard/components";
import { tracksCountMessage } from "@/dashboard/utilities";

import { promiseRejected } from "@/dashboard/components/__mocks__";
import { mockTracks } from "@/dashboard/__mocks__";

const mockPromiseResolve = async () => await Promise.resolve(mockTracks);
const mockPromiseRejected = promiseRejected as unknown as () => Promise<Track[]>;

interface Props {
  title: string;
  to: string;
  request: () => Promise<Track[]>;
}

describe("FeedCard component", () => {
  let props: Props;

  afterEach(cleanup);

  beforeEach(() => {
    props = {
      title: "Some Title",
      to: "/",
      request: mockPromiseResolve,
    };
  });

  it("should render title and skeleton when init", async () => {
    render(<FeedCard {...props} />, { wrapper: BrowserRouter });
    screen.getByText(props.title);
    screen.getByRole("log");
  });

  it("should show the track count when the request completes", async () => {
    render(<FeedCard {...props} />, { wrapper: BrowserRouter });

    await waitForElementToBeRemoved(() => screen.getByRole("log"), { timeout: 10000 });
    screen.getByText(tracksCountMessage(mockTracks.length));
  });

  it("should show 'no tracks' if the request fails", async () => {
    props.request = mockPromiseRejected;
    render(<FeedCard {...props} />, { wrapper: BrowserRouter });

    await waitForElementToBeRemoved(() => screen.getByRole("log"), { timeout: 10000 });
    screen.getByText(tracksCountMessage(0));
  });

  it("should render play button when request success and have tracks", async () => {
    render(<FeedCard {...props} />, { wrapper: BrowserRouter });

    await waitForElementToBeRemoved(() => screen.getByRole("log"), { timeout: 10000 });
    // screen
  });
});
