import type { Track } from "@br/core";

import { useState, useLayoutEffect } from "react";
import { Button } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

import { green } from "theme/colors";

import { newFavoriteTrack, deleteFavoriteById } from "@/dashboard/services/favorites";
import { usePlayerContext } from "@/dashboard/contexts/player";

export interface Props {
  track: Track;
  onClick?: () => void;
}

const animations = {
  addFavorite: {
    scale: [2, 0.8, 1],
  },
  removeFavorite: {
    translateX: ["-10x", 0, "10px", 0, "-10px", 0, "10px", 0],
  },
};

const MotionButton = motion(Button);

export default function Favorite({ track, onClick }: Props) {
  const animate = useAnimation();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { currentTrack, setCurrentTrack } = usePlayerContext();

  const addFavorite = async (track: Track): Promise<void> => {
    animate.start("addFavorite");
    checkCurrentTrack(track.id, true);
    await newFavoriteTrack({ ...track, favorite: true });
  };

  const removeFavorite = async (id: number): Promise<void> => {
    animate.start("removeFavorite");
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
    <MotionButton
      variants={animations}
      animate={animate}
      transition={{ duration: 0.3 }}
      variant="link"
      onClick={handleFavorite}
      fontSize={isFavorite ? "sm" : "md"}
      aria-label={isFavorite ? "Remove Favorite" : "Add Favorite"}
      role="switch"
    >
      {isFavorite ? <FaHeart fill={green} /> : <BiHeart />}
    </MotionButton>
  );
}
