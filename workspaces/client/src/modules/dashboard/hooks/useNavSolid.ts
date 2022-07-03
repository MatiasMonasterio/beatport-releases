import { useState, useMemo } from "react";
import { useMatch } from "react-router-dom";

interface UseNavSolidResponse {
  isSolid: boolean;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export default function useNavSolid(scrollLimit: number): UseNavSolidResponse {
  const artistMatch = useMatch("/artist/:id");
  const labelsMatch = useMatch("/label/:id");
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  const isSolid: boolean = useMemo(() => {
    return !!artistMatch || !!labelsMatch ? hasScrolled : true;
  }, [artistMatch, labelsMatch, hasScrolled]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!artistMatch && !labelsMatch) return;

    const scrollPosition: number = e.currentTarget.scrollTop;

    if (!hasScrolled && scrollPosition > scrollLimit) setHasScrolled(true);
    else if (hasScrolled && scrollPosition <= scrollLimit) setHasScrolled(false);
  };

  return { isSolid, handleScroll };
}
