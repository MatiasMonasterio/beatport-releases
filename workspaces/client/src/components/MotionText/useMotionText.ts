import type { ForwardRef } from "./MotionText";
import { useRef } from "react";

interface UseMotionText {
  ref: React.RefObject<ForwardRef>;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export const useMotionText = (): UseMotionText => {
  const MotionTextNoWrapRef = useRef<ForwardRef>(null);

  return {
    ref: MotionTextNoWrapRef,
    onHoverStart: () => MotionTextNoWrapRef.current?.onHoverStart(),
    onHoverEnd: () => MotionTextNoWrapRef.current?.onHoverEnd(),
  };
};
