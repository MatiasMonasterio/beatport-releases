import { Grid, GridItem } from "@chakra-ui/react";

import { WidgetProvider } from "context/widget";
import { PlayerProvider } from "context/player";
import { Navbar, Sidebar, Player } from "components";
import { useNavSolid } from "hooks";

type Props = { children: React.ReactNode };

export default function DashboardLayout({ children }: Props) {
  const { isSolid, handleScroll } = useNavSolid(400);

  return (
    <WidgetProvider>
      <PlayerProvider>
        <Grid
          templateColumns="240px 1fr"
          h="100vh"
          overflowY="hidden"
          bg="gray.800"
          color="gray.50"
        >
          <GridItem
            bg="gray.900"
            h="100%"
            pt={3}
            borderRight="1px solid"
            borderColor="gray.700"
            gridArea="1 / 1 / 2 / 2"
          >
            <Sidebar />
          </GridItem>

          <GridItem
            overflowY="auto"
            pb={10}
            h="100%"
            position="relative"
            onScroll={handleScroll}
            gridArea="1 / 2 / 2 / 3"
            css={{
              "&::-webkit-scrollbar": {
                width: "10px",
                borderLeft: "1px solid #2D3748",
                backgroundColor: "#171923",
              },
              "&::-webkit-scrollbar-track": {
                width: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#4A5568",
                borderRadius: "10px",
              },
            }}
          >
            <Navbar isSolid={isSolid} />

            {children}
          </GridItem>

          <GridItem gridArea="2 / 1 / 3 / 3" mt="auto">
            <Player />
          </GridItem>
        </Grid>
      </PlayerProvider>
    </WidgetProvider>
  );
}
