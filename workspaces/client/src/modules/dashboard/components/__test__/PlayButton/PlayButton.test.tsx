import { render, screen } from "@testing-library/react";

import type { PlayButtonProps } from "@/dashboard/components/PlayButton";
import PlayButton from "@/dashboard/components/PlayButton";

import { mockTracks } from "@/dashboard/__mocks__";

describe("PlayButton component", () => {
  let props: PlayButtonProps;

  beforeEach(() => {
    props = { playlist: mockTracks };
  });

  it("should be disabled if playlist is empty", () => {
    props.playlist = [];
    render(<PlayButton {...props} />);
    const playButton = screen.getByRole<HTMLButtonElement>("button");

    expect(playButton.disabled).toBeTruthy();
  });

  it("should be enabled if the playlist has tracks", () => {
    render(<PlayButton {...props} />);
    const playButton = screen.getByRole<HTMLButtonElement>("button");

    expect(playButton.disabled).toBeFalsy();
  });

  /**
   * todo: mock custom hook and check if loadPlaylist fn is called
   */
});
