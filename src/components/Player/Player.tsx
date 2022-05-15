import { Grid, GridItem } from "@chakra-ui/react";

import { usePlayerContext } from "context/player";

import AudioPlayer from "./AudioPlayer";
import TrackCard from "./TrackCard";

export default function Player(): JSX.Element {
  const { currentTrack, audioPlayer, nextTrack, prevTrack } = usePlayerContext();

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
        <TrackCard {...currentTrack} />
      </GridItem>

      <GridItem>
        <AudioPlayer
          handleNextTrack={nextTrack}
          hadnlePrevTrack={prevTrack}
          source={currentTrack.preview}
          audioRef={audioPlayer}
        />
      </GridItem>

      <GridItem d="flex" justifyContent="center"></GridItem>
    </Grid>
  );
}
