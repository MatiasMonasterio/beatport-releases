import type { Track } from "@br/core";

import { useState, useLayoutEffect } from "react";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

import { green } from "theme/colors";

import { newFavoriteTrack, deleteFavoriteById } from "@/dashboard/services/favorites";
import { usePlayerContext } from "@/dashboard/contexts/player";

import FavoriteMotion from "./FavoriteMotion";

export interface Props {
  track: Track;
  onClick?: () => void;
}

export default function Favorite({ track, onClick }: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { currentTrack, setCurrentTrack } = usePlayerContext();

  const addFavorite = async (track: Track): Promise<void> => {
    checkCurrentTrack(track.id, true);
    await newFavoriteTrack({ ...track, favorite: true });
  };

  const removeFavorite = async (id: number): Promise<void> => {
    checkCurrentTrack(id, false);
    await deleteFavoriteById(id);
  };

  const checkCurrentTrack = async (id: number, favorite: boolean) => {
    if (currentTrack.id === id) {
      const newCurrentTrack = { ...currentTrack, favorite };
      setCurrentTrack(newCurrentTrack);
    }
  };

  const handleFavorite = (): void => {
    !isFavorite ? addFavorite(track) : removeFavorite(track.id);
    setIsFavorite(!isFavorite);
    onClick && onClick();
  };

  useLayoutEffect(() => {
    setIsFavorite(!!track.favorite);
  }, [track]);

  useLayoutEffect(() => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsFavorite(!!currentTrack.favorite);
    }
  }, [currentTrack]);

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
