import { NavLink } from "react-router-dom";
import {
  Container,
  UnorderedList,
  ListItem,
  Link,
  Box,
  VisuallyHidden,
  Heading,
} from "@chakra-ui/react";
import { BiHome, BiMusic, BiUser, BiGridAlt, BiHeart, BiPulse } from "react-icons/bi";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <Container maxW="container.xl">
      <Link to="/" as={NavLink} display="inline-block" mb={6} w="100%" py={2}>
        <Box bgImage="/images/logo.svg" bgSize="cover" bgPosition="center" h="28px" w="165px" />
        <VisuallyHidden>Beat Releases</VisuallyHidden>
      </Link>

      <UnorderedList styleType="none" ml={0} spacing={1} mb={4}>
        <ListItem>
          <SidebarItem to="/" content="Home" icon={<BiHome />} />
        </ListItem>

        <ListItem>
          <SidebarItem to="/releases" content="Releases" icon={<BiMusic />} />
        </ListItem>
      </UnorderedList>

      <UnorderedList styleType="none" ml={0} spacing={1} mb={4}>
        <Heading fontSize="xs" color="gray.600" fontWeight="normal" px={2} mb={2}>
          Your Collection
        </Heading>

        <ListItem>
          <SidebarItem to="/favorites" content="Favorites Tracks" icon={<BiHeart />} />
        </ListItem>

        <ListItem>
          <SidebarItem to="/artists" content="Artists" icon={<BiUser />} />
        </ListItem>

        <ListItem>
          <SidebarItem to="/labels" content="Labels" icon={<BiGridAlt />} />
        </ListItem>
      </UnorderedList>

      <UnorderedList styleType="none" ml={0} spacing={1} mb={4}>
        <Heading fontSize="xs" color="gray.600" fontWeight="normal" px={2} mb={2}>
          Discover
        </Heading>

        <ListItem>
          <SidebarItem to="/upcomings" content="Upcomings" icon={<BiPulse />} />
        </ListItem>
      </UnorderedList>
    </Container>
  );
}
