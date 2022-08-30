import type { Props, ITrack } from "./TrackRow";

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { PlayerProvider } from "@/dashboard/contexts/player";
import { track } from "mocks/tracks";

import TrackRow from "./TrackRow";

dayjs.extend(relativeTime);

const mockOnPlay = jest.fn();

describe("TrackCard component", () => {
  let mockProps: Props;

  beforeEach(() => {
    mockProps = {
      isFavoriteList: false,
      track: track,
      onPlay: mockOnPlay,
    };

    render(
      <MemoryRouter>
        <PlayerProvider>
          <TrackRow {...mockProps} />
        </PlayerProvider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("must show track data", () => {
    const trackImage = screen.getByRole<HTMLImageElement>("img");

    screen.getByText(`${mockProps.track.name} ${mockProps.track.mix}`);
    screen.getByText(mockProps.track.artists[0].name);
    screen.getByText(mockProps.track.label.name);
    screen.getByText(mockProps.track.genre.name);
    screen.getByText(mockProps.track.bpm);
    screen.getByText(dayjs(mockProps.track.released).fromNow());

    expect(trackImage.src).toBe(mockProps.track.artwork);
  });

  test("is cliked, must execute on play function with track data", () => {
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);

    expect(mockOnPlay).toHaveBeenCalledTimes(1);
    expect(mockOnPlay).toBeCalledWith(mockProps.track);
  });

  test("should render Favorite Component", () => {
    const favoriteText = mockProps.track.favorite ? /remove favorite/i : /add favorite/i;
    screen.getByRole("switch", { name: favoriteText });
  });

  test("should display the creation date from today if it's a favorites list", () => {
    mockProps.isFavoriteList = true;
    const { createdAt } = mockProps.track as ITrack;

    render(
      <MemoryRouter>
        <PlayerProvider>
          <TrackRow {...mockProps} />
        </PlayerProvider>
      </MemoryRouter>
    );

    screen.getByText(dayjs(createdAt).fromNow());
  });
});
