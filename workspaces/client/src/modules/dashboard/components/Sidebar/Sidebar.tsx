import { NavLink } from "react-router-dom";
import { Container, UnorderedList, Link, Box, VisuallyHidden } from "@chakra-ui/react";
import { BiHome, BiMusic, BiUser, BiGridAlt, BiHeart, BiPulse, BiSearch } from "react-icons/bi";

import { SidebarItem, SidebarTitle } from "./components";

export default function Sidebar() {
  return (
    <Container maxW="container.xl">
      <Link to="/" as={NavLink} display="inline-block" mb={6} w="100%" py={2}>
        <Box bgImage="/images/logo.svg" bgSize="cover" bgPosition="center" h="28px" w="165px" />
        <VisuallyHidden>Beat Releases</VisuallyHidden>
      </Link>

      <UnorderedList styleType="none" ml={0} spacing={1} mb={4}>
        <SidebarItem to="/" content="Home" icon={<BiHome />} />
        <SidebarItem to="/releases" content="Releases" icon={<BiMusic />} />
        <SidebarItem to="/search" content="Search" icon={<BiSearch />} />
      </UnorderedList>

      <SidebarTitle>Your Collection</SidebarTitle>
      <UnorderedList styleType="none" ml={0} spacing={1} mb={4}>
        <SidebarItem to="/favorites" content="Favorites Tracks" icon={<BiHeart />} />
        <SidebarItem to="/artists" content="Artists" icon={<BiUser />} />
        <SidebarItem to="/labels" content="Labels" icon={<BiGridAlt />} />
      </UnorderedList>

      <SidebarTitle>Discover</SidebarTitle>
      <UnorderedList styleType="none" ml={0} spacing={1} mb={4}>
        <SidebarItem to="/upcomings" content="Upcomings" icon={<BiPulse />} />
      </UnorderedList>
    </Container>
  );
}
