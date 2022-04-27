import { Grid, GridItem } from "@chakra-ui/react";

import { WidgetProvider } from "context/widget";
import { Navbar, Sidebar } from "components";

type Props = { children: React.ReactNode };

export default function DashboardLayout({ children }: Props) {
  return (
    <WidgetProvider>
      <Grid templateColumns="250px 1fr" h="100vh" overflowY="hidden" bg="gray.800" color="gray.50">
        <GridItem bg="gray.900" pt={6}>
          <Sidebar />
        </GridItem>

        <GridItem h="100vh" overflowY="auto" pb={10} position="relative">
          <Navbar />

          {children}
        </GridItem>
      </Grid>
    </WidgetProvider>
  );
}
