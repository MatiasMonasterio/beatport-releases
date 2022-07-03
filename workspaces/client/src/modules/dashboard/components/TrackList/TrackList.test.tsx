import type { Props } from "./TrackList";

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { PlayerProvider } from "@/dashboard/contexts/player";
import { releases } from "mocks/tracks";

import TrackList from "./TrackList";

const props: Props = {
  isLoading: false,
  tracks: releases,
};

const mockLoadPlaylist = jest.fn();

jest.mock("@/dashboard/contexts/player", () => ({
  ...jest.requireActual("@/dashboard/contexts/player"),
  usePlayerContext: () => ({
    ...jest.requireActual("@/dashboard/contexts/player/usePlayerContext"),
    loadPlaylist: mockLoadPlaylist,
  }),
}));

describe("TrackList component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PlayerProvider>
          <TrackList {...props} />
        </PlayerProvider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("must render all tracks", () => {
    const tracks = screen.getAllByRole<HTMLDivElement>("listitem");
    expect(tracks.length).toBe(props.tracks.length);
  });

  test("should load the current track and playlist when the play button is clicked", () => {
    const playButton = screen.getByRole<HTMLButtonElement>("button", { name: "play" });
    fireEvent.click(playButton);

    expect(mockLoadPlaylist).toBeCalledTimes(1);
    expect(mockLoadPlaylist).toBeCalledWith({
      track: props.tracks[0],
      playlist: props.tracks,
    });
  });
});
