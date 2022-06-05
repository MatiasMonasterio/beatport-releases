import { Box, Grid, GridItem, Skeleton, VStack } from "@chakra-ui/react";

export default function TrackCard() {
  return (
    <Box borderRadius="sm" overflow="hidden">
      <Grid
        templateColumns={{
          base: "90px 1fr",
          sm: "90px minmax(200px, 1fr) minmax(150px, 250px) minmax(30px, 100px) minmax(80px, 150px)",
        }}
        gap={6}
      >
        <GridItem>
          <Skeleton boxSize={24} startColor="gray.800" endColor="gray.700" />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }}>
          <VStack alignItems="start">
            <Skeleton width="200px" height="1.2rem" startColor="gray.800" endColor="gray.700" />
            <Skeleton width="100px" height="0.9rem" startColor="gray.800" endColor="gray.700" />

            <Skeleton
              mt="auto"
              width="50px"
              height="0.9rem"
              startColor="gray.800"
              endColor="gray.700"
            />
          </VStack>
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }}>
          <Skeleton width="150px" height="1rem" startColor="gray.800" endColor="gray.700" />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }}>
          <Skeleton width="30px" height="1rem" startColor="gray.800" endColor="gray.700" />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }}>
          <Skeleton width="80px" height="1rem" startColor="gray.800" endColor="gray.700" />
        </GridItem>
      </Grid>
    </Box>
  );
}
