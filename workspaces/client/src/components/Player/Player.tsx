import { Grid, GridItem } from "@chakra-ui/react";

import AudioPlayer from "./AudioPlayer";
import TrackCard from "./TrackCard";

export default function Player(): JSX.Element {
  return (
    <Grid
      bg="gray.800"
      px={4}
      py={2}
      borderTop="1px solid"
      alignItems="center"
      borderColor="gray.700"
      templateColumns={{ base: "8fr 1fr", sm: "1fr 2fr 1fr" }}
      gap={{ base: 2, sm: 10 }}
      position="relative"
    >
      <GridItem>
        <TrackCard />
      </GridItem>

      <GridItem>
        <AudioPlayer />
      </GridItem>

      <GridItem display={{ base: "none", sm: "flex" }} justifyContent="center"></GridItem>
    </Grid>
  );
}
