import type { Track } from "@br/core";

import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

import { green } from "theme/colors";
import { newFavoriteTrack, deleteFavoriteById } from "@/dashboard/services/favorites";

import { FavoriteMotion } from "./components";
import { useFavoriteState, useUpdateCurrentTrack } from "./hooks";

export interface Props {
  track: Track;
}

export default function Favorite({ track }: Props) {
  const { isFavorite, togglefavorite } = useFavoriteState(track);
  const { checkCurrentTrack } = useUpdateCurrentTrack(track.id, isFavorite);

  const handleFavorite = async () => {
    checkCurrentTrack();
    togglefavorite();

    isFavorite
      ? await deleteFavoriteById(track.id)
      : await newFavoriteTrack({ ...track, favorite: true });
  };

  return (
    <FavoriteMotion
      isActive={isFavorite}
      variant="link"
      onClick={handleFavorite}
      fontSize={isFavorite ? "sm" : "md"}
      aria-label={isFavorite ? "Remove Favorite" : "Add Favorite"}
      role="switch"
    >
      {isFavorite ? <FaHeart fill={green} /> : <BiHeart />}
    </FavoriteMotion>
  );
}
