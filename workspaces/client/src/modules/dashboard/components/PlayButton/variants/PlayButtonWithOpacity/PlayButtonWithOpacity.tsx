import type { PlayButtonProps } from "@/dashboard/components/PlayButton/PlayButton";
import { PlayButton } from "@/dashboard/components";

export default function PlayButtonWithOpacity({ playlist, disabled }: PlayButtonProps) {
  return (
    <PlayButton
      playlist={playlist}
      disabled={disabled}
      opacity={0}
      p={0}
      fontSize="2xl"
      _groupFocusWithin={{ opacity: 1, pointerEvents: "initial" }}
      _groupHover={{ opacity: 1, pointerEvents: "initial" }}
    />
  );
}
