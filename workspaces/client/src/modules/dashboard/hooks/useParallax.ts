import { useEffect, useRef } from "react";

export default function useParallax() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const parallax = (scrillTop: number) => {
    const initialMoveY = 0;
    const moveY = initialMoveY + scrillTop / 7;

    if (parallaxRef.current) {
      parallaxRef.current.style.transform = `translateY(${moveY}px)`;
    }
  };

  const handleScroll = (e: Event) => {
    const targetDiv: HTMLDivElement = e.target as HTMLDivElement;
    parallax(targetDiv.scrollTop);
  };

  useEffect(() => {
    const scrollableParent = document.querySelector(".dashboard-main-content");

    scrollableParent?.addEventListener("scroll", handleScroll);
    return () => scrollableParent?.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    parallax(0);
  }, [parallaxRef]);

  return { parallaxRef };
}
