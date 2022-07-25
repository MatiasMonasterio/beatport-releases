import type { CenterProps } from "@chakra-ui/react";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";

interface Props extends CenterProps {
  children: React.ReactNode;
}

const CenterMotion = motion(Center);

const animation = {
  opacity: [0, 1],
  translateX: ["-20px", "0px"],
};

export default function MotionCenter({ children, ...args }: Props) {
  const animate = useAnimation();
  const params = useParams();

  useEffect(() => {
    animate.start(animation);
  }, [params]);

  return (
    <CenterMotion animate={animate} transition={{ duration: 0.7 }} opacity={0} {...args}>
      {children}
    </CenterMotion>
  );
}
