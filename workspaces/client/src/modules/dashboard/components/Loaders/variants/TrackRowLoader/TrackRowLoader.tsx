import { Box, Grid, GridItem, Skeleton, VStack } from "@chakra-ui/react";

export default function TrackRowLoader() {
  return (
    <Box borderRadius="sm" overflow="hidden">
      <Grid
        templateColumns={{
          base: "90px 1fr",
          sm: "minmax(290px, 1fr) minmax(150px, 290px) minmax(30px, 100px) minmax(50px, 120px) 60px",
        }}
        gap={6}
      >
        <GridItem display="flex" gap={4}>
          <Skeleton boxSize={16} />

          <VStack alignItems="start">
            <Skeleton width="200px" height="1rem" />
            <Skeleton width="120px" height="0.8rem" />

            <Skeleton mt="auto" width="50px" height="0.8rem" />
          </VStack>
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }} alignSelf="center">
          <Skeleton width="150px" height="0.8rem" />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }} alignSelf="center">
          <Skeleton width="30px" height="0.8rem" />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }} alignSelf="center">
          <Skeleton width="80px" height="0.8rem" />
        </GridItem>

        <GridItem py={{ base: 0, sm: 1 }} px={5} alignSelf="center">
          <Skeleton width="16px" height="16px" />
        </GridItem>
      </Grid>
    </Box>
  );
}
