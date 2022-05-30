import { NavLink } from "react-router-dom";
import { Container, UnorderedList, ListItem, Link, Box, VisuallyHidden } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Container maxW="container.xl">
      <Link to="/" as={NavLink} display="inline-block" mb={6} w="100%" h="40px">
        <Box bgImage="/images/logo.svg" bgSize="cover" bgPosition="center" h="35px" w="160px" />
        <VisuallyHidden>Beat Releases</VisuallyHidden>
      </Link>

      <UnorderedList styleType="none" ml={0}>
        <ListItem mb={6}>
          <Link
            as={NavLink}
            to="/artists"
            py={2}
            d="block"
            fontSize="xl"
            fontWeight="bold"
            _hover={{
              color: "#01FF95",
            }}
          >
            Artists
          </Link>

          <UnorderedList styleType="none" color="gray.500" ml={0}>
            <ListItem>
              <Link
                as={NavLink}
                to="/artists/releases"
                display="flex"
                _hover={{
                  color: "#01FF95",
                }}
                py={2}
                pl={2}
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
                _hover={{
                  color: "#01FF95",
                }}
                py={2}
                pl={2}
                alignItems="center"
                textDecoration="none"
                fontSize="sm"
              >
                Upcoming
              </Link>
            </ListItem>
          </UnorderedList>
        </ListItem>

        <ListItem py={2}>
          <Link
            as={NavLink}
            to="labels"
            d="block"
            fontWeight="bold"
            fontSize="xl"
            w="100%"
            _hover={{
              color: "#01FF95",
            }}
          >
            Labels
          </Link>
        </ListItem>

        <UnorderedList styleType="none" fontWeight="normal" color="gray.500" ml={0}>
          <ListItem>
            <Link
              as={NavLink}
              to="/labels/releases"
              display="flex"
              _hover={{
                color: "#01FF95",
              }}
              py={2}
              pl={2}
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
              to="/labels/upcoming"
              display="flex"
              _hover={{
                color: "#01FF95",
              }}
              gap={2}
              py={2}
              pl={2}
              alignItems="center"
              textDecoration="none"
              fontSize="sm"
            >
              Upcoming
            </Link>
          </ListItem>
        </UnorderedList>
      </UnorderedList>
    </Container>
  );
}
