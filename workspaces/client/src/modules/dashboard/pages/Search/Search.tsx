import { Link as ReactLink } from "react-router-dom";
import { Container, Box, Heading, Flex, Text, VStack, Link, HStack } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";

import { MetaTags } from "components";
import { useGetInitialData } from "hooks";

import { CardList } from "@/dashboard/components";
import { getArtists } from "@/dashboard/services/artists";

export default function Search() {
  const { data: artists, isLoading: artistIsLoading } = useGetInitialData({
    request: async () => await getArtists({ sort: "createdAt", length: 5 }),
    defaultValue: [],
  });

  return (
    <>
      <MetaTags title="Search Result" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Box as="section">
          <VStack as="section" alignItems="initial" mb={12}>
            <HStack mb={4} justifyContent="space-between" fontSize="sm">
              <Heading as="h2" size="lg">
                Artists
              </Heading>

              <Link
                as={ReactLink}
                to="/artists"
                color="secondary.gray.700"
                _hover={{ color: "primary.green" }}
              >
                View more
              </Link>
            </HStack>

            <CardList
              size="md"
              type="artist"
              datas={artists}
              isLoading={artistIsLoading}
              newCard={false}
            />
          </VStack>

          <VStack as="section" alignItems="initial">
            <HStack mb={4} justifyContent="space-between" fontSize="sm">
              <Heading as="h2" size="lg">
                Labels
              </Heading>

              <Link
                as={ReactLink}
                to="/artists"
                color="secondary.gray.700"
                _hover={{ color: "primary.green" }}
              >
                View more
              </Link>
            </HStack>

            <CardList
              size="md"
              type="artist"
              datas={artists}
              isLoading={artistIsLoading}
              newCard={false}
            />
          </VStack>

          {!artists.length && (
            <Flex w="100%" height="-moz-max-content" alignItems="center" justify="center" pt={20}>
              <Box textAlign="center">
                <Flex justify="center" fontSize="7xl" mb={4}>
                  <BiSearchAlt />
                </Flex>

                <Heading as="h3" size="md" mb={1}>
                  What are you searching for?
                </Heading>

                <Text fontSize="sm">Search for your favorite artist or label</Text>
              </Box>
            </Flex>
          )}
        </Box>
      </Container>
    </>
  );
}
