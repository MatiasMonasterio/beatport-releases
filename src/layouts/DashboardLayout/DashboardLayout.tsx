import { Grid, GridItem, Container } from "@chakra-ui/react";

import { Navbar } from "components/Navbar";
import { Sidebar } from "components/Sidebar";

type Props = { children: JSX.Element | JSX.Element[] };

export default function DashboardLayout({ children }: Props) {
  return (
    <Grid templateColumns="250px 1fr" h="100vh" overflowY="hidden" bg="gray.800" color="gray.50">
      <GridItem bg="gray.900" pt={6}>
        <Sidebar />
      </GridItem>

      <GridItem h="100vh" overflowY="auto" pb={10} position="relative">
        <Navbar />

        <Container maxW="container.xl">{children}</Container>
      </GridItem>
    </Grid>
  );
}
