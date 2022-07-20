import { Box, Grid, GridItem, Skeleton, VStack } from "@chakra-ui/react";

export default function TrackCard() {
  return (
    <Box borderRadius="sm" overflow="hidden">
      <Grid
        templateColumns={{
          base: "90px 1fr",
          sm: "90px minmax(200px, 1fr) minmax(150px, 290px) minmax(30px, 100px) minmax(50px, 120px) 60px",
        }}
        gap={6}
      >
        <GridItem>
          <Skeleton boxSize={20} />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }}>
          <VStack alignItems="start">
            <Skeleton width="200px" height="1.2rem" />
            <Skeleton width="100px" height="0.9rem" />

            <Skeleton mt="auto" width="50px" height="0.9rem" />
          </VStack>
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }} alignSelf="center">
          <Skeleton width="150px" height="1rem" />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }} alignSelf="center">
          <Skeleton width="30px" height="1rem" />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }} alignSelf="center">
          <Skeleton width="80px" height="1rem" />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }} px={5} alignSelf="center">
          <Skeleton width="16px" height="16px" />
        </GridItem>
      </Grid>
    </Box>
  );
}
