import type { Track } from "@br/core";
import { Button, Image } from "@chakra-ui/react";

interface Props {
  track: Track;
  onClick: () => void;
}

export default function ImageButton({ track, onClick }: Props) {
  return (
    <Button variant="link" display="block" onClick={onClick} aria-label="play">
      <Image src={track.artwork} boxSize={20} loading="lazy" />
    </Button>
  );
}
