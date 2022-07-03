import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import { SecondNavbar } from "@/dashboard/components";

const artistsRoutes = [
  { path: "/artists", name: "All" },
  { path: "/artists/releases", name: "Releases" },
  { path: "/artists/upcomings", name: "Upcomings" },
];

export default function ArtistsLayout() {
  return (
    <>
      <SecondNavbar routes={artistsRoutes} />
      <Container maxW="container.xl">
        <Outlet />
      </Container>
    </>
  );
}
