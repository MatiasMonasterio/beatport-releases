import { Grid, GridItem } from "@chakra-ui/react";

import { WidgetProvider } from "context/widget";
import { Navbar, Sidebar } from "components";
import { useNavSolid } from "hooks";

type Props = { children: React.ReactNode };

export default function DashboardLayout({ children }: Props) {
  const { isSolid, handleScroll } = useNavSolid(50);

  return (
    <WidgetProvider>
      <Grid templateColumns="240px 1fr" h="100vh" overflowY="hidden" bg="gray.800" color="gray.50">
        <GridItem bg="gray.900" pt={3} borderRight="1px solid" borderColor="gray.700">
          <Sidebar />
        </GridItem>

        <GridItem h="100vh" overflowY="auto" pb={10} position="relative" onScroll={handleScroll}>
          <Navbar isSolid={isSolid} />

          {children}
        </GridItem>
      </Grid>
    </WidgetProvider>
  );
}
