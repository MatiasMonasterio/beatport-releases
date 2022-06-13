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
          templateColumns={{ base: "1fr", sm: "240px 1fr" }}
          templateRows="1fr"
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
            display={{ base: "none", sm: "block" }}
          >
            <Sidebar />
          </GridItem>

          <GridItem
            overflowY="scroll"
            pb={10}
            h="100%"
            position="relative"
            onScroll={handleScroll}
            overflowX="hidden"
            gridArea={{ base: "1", sm: "1 / 2 / 2 / 3" }}
            css={{
              "@media (min-width: 480px)": {
                "&::-webkit-scrollbar": {
                  width: "12px",
                  borderLeft: "1px solid #2D3748",
                  backgroundColor: "#1A202C",
                },
                "&::-webkit-scrollbar-track": {
                  width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(0, 0, 0, 0.48)",
                  borderLeft: "1px solid #2D3748",
                  borderRadius: "2px",
                },
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
