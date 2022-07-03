import { BoxProps } from "@chakra-ui/react";

import { useLayoutEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { Box } from "@chakra-ui/react";
import { motion, useMotionValue, animate } from "framer-motion";

interface Props extends BoxProps {
  children: React.ReactNode;
  speed?: number;
  delay?: number;
}

export interface ForwardRef {
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const TextMotion = motion(Box);

export default forwardRef<ForwardRef, Props>(function MotionText(props, ref) {
  const { children, speed = 15, delay = 700, ...args } = props;

  const boxRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const translateX = useMotionValue(0);

  const handleScrollText = (): void => {
    const contentWidth = boxRef.current?.scrollWidth;
    const containerWidth = boxRef.current?.clientWidth;

    const diference = contentWidth && containerWidth ? containerWidth - contentWidth : 0;
    const duration = -diference / speed;

    if (!diference || translateX.isAnimating()) return;
    const translateXValues = translateX.get();

    if (translateXValues < 0) animate(translateX, 0, { duration: duration, ease: "linear" });
    else animate(translateX, diference, { duration: duration, ease: "linear" });
  };

  const onHoverStart = () => {
    timer.current = setTimeout(handleScrollText, delay);
  };

  const onHoverEnd = () => {
    timer.current && clearTimeout(timer.current);
  };

  useImperativeHandle(ref, () => ({
    onHoverStart,
    onHoverEnd,
  }));

  useLayoutEffect(() => {
    translateX.set(0);
  }, [children]);

  return (
    <Box
      position="relative"
      maxWidth="100%"
      transition="none"
      pr="10px"
      _after={{
        content: `""`,
        position: "absolute",
        display: "block",
        width: "10px",
        height: "110%",
        transition: "none",
        background: `linear-gradient(90deg, rgba(26, 32, 44, 0.2) 0%, #1A202C 90%);`,
        right: 0,
        top: 0,
      }}
    >
      <TextMotion
        style={{ translateX }}
        ref={boxRef}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        whiteSpace="nowrap"
        {...args}
      >
        {children}
      </TextMotion>
    </Box>
  );
});
