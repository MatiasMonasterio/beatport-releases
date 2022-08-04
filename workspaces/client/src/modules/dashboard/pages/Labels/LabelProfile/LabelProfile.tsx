import type { Label } from "@br/core";

import { useParams } from "react-router-dom";
import { Heading, Flex, Link, Box, Container, Skeleton, HStack, VStack } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useGetInitialData } from "hooks";

import { TrackList, Follow, PlayButtonLg } from "@/dashboard/components";
import { useParallax } from "@/dashboard/hooks";
import {
  getLabelById,
  addLabelId,
  deleteLabelById,
  getTracksByLabelId,
} from "@/dashboard/services/labels";

export default function LabelProfile(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { parallaxRef } = useParallax();

  const { data: label, isLoading } = useGetInitialData({
    request: async () => await getLabelById(id),
    defaultValue: {} as Label,
  });

  const handleFollow = async (isFollowing: boolean): Promise<void> => {
    if (isFollowing) await deleteLabelById(id);
    else await addLabelId(id);
  };

  return (
    <>
      {label.name && <MetaTags title={label.name} />}

      <Box mb={10} h={{ base: 300, sm: 350 }} position="relative" zIndex={1} overflow="hidden">
        <Box
          ref={parallaxRef}
          backgroundImage={label.artwork}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          position="absolute"
          w="100%"
          h="100%"
          zIndex={-1}
        />

        <Flex h="100%" bg="rgba(0,0,0,0.6)" direction="column" justify="end" py={10}>
          <Container maxW="container.xl">
            {isLoading ? (
              <>
                <Skeleton width="250px" height="2.1rem" mb={2} />
                <Skeleton width="150px" height="0.9rem" />
              </>
            ) : (
              <HStack gap={2}>
                <PlayButtonLg playlist={label.tracks} disabled={!label.tracks?.length} />

                <VStack align="flex-start">
                  <HStack alignItems="end">
                    <Heading>{label.name}</Heading>
                    <Follow isFollowing={!!label.follow} onFollow={handleFollow} />
                  </HStack>

                  <Link
                    isExternal
                    href={label.profile}
                    fontSize="sm"
                    color="secondary.gray.200"
                    mr="auto"
                  >
                    Go to beatport profile
                  </Link>
                </VStack>
              </HStack>
            )}
          </Container>
        </Flex>
      </Box>

      <Container maxW="container.xl">
        <Heading as="h2" size="md" mb={4}>
          Last Releases
        </Heading>

        <TrackList request={async () => await getTracksByLabelId(id)} />
      </Container>
    </>
  );
}
