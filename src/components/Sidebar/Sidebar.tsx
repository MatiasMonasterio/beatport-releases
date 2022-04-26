import { NavLink } from "react-router-dom";
import { Container, Heading, UnorderedList, ListItem, Link, Box } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Container maxW="container.xl">
      <Box pb={10}>Brand</Box>

      <UnorderedList styleType="none" ml={0}>
        <ListItem mb={6}>
          <Link
            as={NavLink}
            to="/artists"
            display="flex"
            py={2}
            gap={2}
            alignItems="center"
            textDecoration="none"
            fontSize="sm"
          >
            <Heading size="md" mb={2}>
              Artists
            </Heading>
          </Link>

          <UnorderedList styleType="none" fontWeight="bold" color="gray.500">
            <ListItem>
              <Link
                as={NavLink}
                to="/artists/releases"
                display="flex"
                py={2}
                gap={2}
                alignItems="center"
                textDecoration="none"
                fontSize="sm"
              >
                Last Releases
              </Link>
            </ListItem>

            <ListItem>
              <Link
                as={NavLink}
                to="/artists/upcoming"
                display="flex"
                gap={2}
                py={2}
                alignItems="center"
                textDecoration="none"
                fontSize="sm"
              >
                Upcoming
              </Link>
            </ListItem>
          </UnorderedList>
        </ListItem>

        <ListItem mb={6}>
          <Heading size="md" mb={4}>
            <Link as={NavLink} to="artists">
              Artists
            </Link>
          </Heading>
        </ListItem>

        <ListItem mb={6}>
          <Heading size="md" mb={4}>
            <Link as={NavLink} to="artists">
              Labels
            </Link>
          </Heading>
        </ListItem>
      </UnorderedList>
    </Container>
  );
}
