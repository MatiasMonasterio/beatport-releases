import { Grid } from "@chakra-ui/react";
import { useMobile } from "hooks";

import { PlayingBarMobile, PlayinBarDesktop } from "./variants";

export default function PlayingBar() {
  const IsMobile = useMobile();

  return (
    <Grid
      bgColor="secondary.black.800"
      px={4}
      py={2}
      borderTop="1px solid"
      alignItems="center"
      borderColor="secondary.black.600"
      templateColumns={{ base: "8fr 1fr", sm: "1fr 2fr 1fr" }}
      gap={{ base: 2, sm: 10 }}
      position="relative"
    >
      {IsMobile ? <PlayingBarMobile /> : <PlayinBarDesktop />}
    </Grid>
  );
}
