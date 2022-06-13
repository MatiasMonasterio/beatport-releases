import { Container } from "@chakra-ui/react";
import { SecondNavbar } from "components";

interface Props {
  children: React.ReactNode;
}

const artistsRoutes = [
  { path: "/artists", name: "All" },
  { path: "/artists/releases", name: "Releases" },
  { path: "/artists/upcomings", name: "Upcomings" },
];

export default function ArtistsLayout({ children }: Props) {
  return (
    <>
      <SecondNavbar routes={artistsRoutes} />
      <Container maxW="container.xl">{children}</Container>
    </>
  );
}
