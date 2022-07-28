import type { ButtonProps } from "@chakra-ui/react";

import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";

interface Props extends ButtonProps {
  children: React.ReactNode;
  isActive: boolean;
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

export default function FavoriteMotion({ children, isActive, ...args }: Props) {
  const animate = useAnimation();

  useEffect(() => {
    isActive ? animate.start("addFavorite") : animate.start("removeFavorite");
  }, [isActive]);

  return (
    <MotionButton variants={animations} animate={animate} transition={{ duration: 0.3 }} {...args}>
      {children}
    </MotionButton>
  );
}
