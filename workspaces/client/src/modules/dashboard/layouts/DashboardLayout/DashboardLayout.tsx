import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";

import { black } from "theme/colors";

import { WidgetProvider } from "@/dashboard/contexts/widget";
import { PlayerProvider } from "@/dashboard/contexts/player";
import { Navbar, Sidebar, PlayingBar } from "@/dashboard/components";
import { useNavSolid } from "@/dashboard/hooks";

export default function DashboardLayout() {
  const { isSolid, handleScroll } = useNavSolid(400);

  return (
    <WidgetProvider>
      <PlayerProvider>
        <Grid
          templateColumns={{ base: "1fr", sm: "240px 1fr" }}
          templateRows="1fr"
          h="100vh"
          overflowY="hidden"
        >
          <GridItem
            h="100%"
            boxShadow="0 -10px 25px rgba(0,0,0,0.2)"
            zIndex={1000}
            pt={3}
            borderRight="1px solid"
            borderColor="secondary.black.600"
            bgColor="secondary.black.900"
            gridArea="1 / 1 / 2 / 2"
            display={{ base: "none", sm: "block" }}
          >
            <Sidebar />
          </GridItem>

          <GridItem
            className="dashboard-main-content"
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
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: black[700],
                  borderRadius: "2px",
                },
              },
            }}
          >
            <Navbar isSolid={isSolid} />

            <Outlet />
          </GridItem>

          <GridItem gridArea="2 / 1 / 3 / 3" mt="auto">
            <PlayingBar />
          </GridItem>
        </Grid>
      </PlayerProvider>
    </WidgetProvider>
  );
}
