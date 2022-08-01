import type { Props } from "./Favorite";

import { render, screen, fireEvent } from "@testing-library/react";

import { PlayerProvider } from "@/dashboard/contexts/player";
import { newFavoriteTrack, deleteFavoriteById } from "@/dashboard/services/favorites";
import { track } from "mocks/tracks";

import Favorite from "./Favorite";

jest.mock("@/dashboard/services/favorites");

const props: Props = {
  track: track,
};

describe("Favorite component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should be shown active if the track is a favorite", () => {
    props.track.favorite = true;

    render(
      <PlayerProvider>
        <Favorite {...props} />
      </PlayerProvider>
    );

    const favoriteButton = screen.getByRole<HTMLButtonElement>("switch");
    expect(favoriteButton.getAttribute("aria-label")).toBe("Remove Favorite");
  });

  test("the favorite component should be saved as a favorite and change state as a favorite if you click the button when it is not a favorite", () => {
    props.track.favorite = false;

    render(
      <PlayerProvider>
        <Favorite {...props} />
      </PlayerProvider>
    );

    const favoriteButton = screen.getByRole<HTMLButtonElement>("switch");
    expect(favoriteButton.getAttribute("aria-label")).toBe("Add Favorite");

    fireEvent.click(favoriteButton);

    expect(newFavoriteTrack).toBeCalledTimes(1);
    expect(newFavoriteTrack).toBeCalledWith({ ...props.track, favorite: true });
    expect(favoriteButton.getAttribute("aria-label")).toBe("Remove Favorite");
  });

  test("should remove the favorite and change to a non-favorite state if the button is clicked when it is a favorite", () => {
    props.track.favorite = true;

    render(
      <PlayerProvider>
        <Favorite {...props} />
      </PlayerProvider>
    );

    const favoriteButton = screen.getByRole<HTMLButtonElement>("switch");
    expect(favoriteButton.getAttribute("aria-label")).toBe("Remove Favorite");

    fireEvent.click(favoriteButton);

    expect(deleteFavoriteById).toBeCalledTimes(1);
    expect(deleteFavoriteById).toBeCalledWith(props.track.id);
    expect(favoriteButton.getAttribute("aria-label")).toBe("Add Favorite");
  });
});
