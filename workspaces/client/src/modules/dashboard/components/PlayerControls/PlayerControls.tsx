import { useMobile } from "hooks";
import { usePlayerContext } from "@/dashboard/contexts/player";

import { AudioPlayerDesktop, AudioPlayerMobile } from "./variants";

export default function PlayerControls() {
  const isMobile = useMobile();
  const { currentTrack, audioRef } = usePlayerContext();

  return (
    <>
      {isMobile ? <AudioPlayerMobile /> : <AudioPlayerDesktop />}
      <audio ref={audioRef} src={currentTrack.preview} />
    </>
  );
}
