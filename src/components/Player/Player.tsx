import { useRef, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { usePlayer } from "context/player";

import AudioPlayer from "./AudioPlayer";
import TrackCard from "./TrackCard";

export default function Player(): JSX.Element {
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { track } = usePlayer();

  const handlePlay = (): void => setIsPlaying(true);
  const handlePause = (): void => setIsPlaying(false);

  const handleLoadMetadata = (): void => {
    setDuration(audioPlayer.current?.duration || 0);
  };

  const handleTimeUpdate = (): void => {
    setCurrentTime(audioPlayer.current?.currentTime || 0);
  };

  const handlePlayTrack = (): void => {
    const isPaused = audioPlayer.current?.paused;

    if (isPaused) audioPlayer.current?.play();
    else audioPlayer.current?.pause();
  };

  const handleChangeCurrentTime = (newCurrentTime: number): void => {
    if (audioPlayer.current) audioPlayer.current.currentTime = newCurrentTime;
  };

  return (
    <Grid
      bg="gray.800"
      p={4}
      borderTop="1px solid"
      alignItems="center"
      borderColor="gray.700"
      templateColumns="1fr 2fr 1fr"
      gap={10}
    >
      <GridItem>
        <TrackCard {...track} />
      </GridItem>

      <GridItem>
        <AudioPlayer
          duration={duration}
          currentTime={currentTime}
          isPlaying={isPlaying}
          handleChangeCurrentTime={handleChangeCurrentTime}
          handlePlayTrack={handlePlayTrack}
        />
        <audio
          autoPlay
          onLoadedMetadata={handleLoadMetadata}
          onPause={handlePause}
          onPlay={handlePlay}
          onTimeUpdate={handleTimeUpdate}
          ref={audioPlayer}
          src={track.preview}
        />
      </GridItem>

      <GridItem d="flex" justifyContent="center"></GridItem>
    </Grid>
  );
}
