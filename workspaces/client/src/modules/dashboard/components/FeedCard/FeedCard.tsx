import type { Track } from "@br/core";

import { useMemo, lazy } from "react";
import { Link } from "react-router-dom";
import { Heading, Text, LinkBox, LinkOverlay, HStack, Box, Skeleton } from "@chakra-ui/react";

import { useGetInitialData } from "hooks";

import { tracksCountMessage } from "@/dashboard/utilities";
const PlayButtonWithOpacity = lazy(
  () => import("@/dashboard/components/PlayButton/variants/PlayButtonWithOpacity")
);

interface Props {
  title: string;
  to: string;
  request: () => Promise<Track[]>;
}

export default function FeedCard({ title, to, request }: Props) {
  const { data: tracks, isLoading } = useGetInitialData({
    request: request,
    defaultValue: [],
  });

  const tracksCountMsg: string = useMemo(() => {
    return tracksCountMessage(tracks.length);
  }, [tracks]);

  return (
    <LinkBox
      bgGradient="linear(to-bl, secondary.blue, secondary.pink)"
      p={4}
      backdropBlur="2px"
      borderRadius="lg"
      role="group"
      pt={16}
    >
      <HStack justifyContent="space-between">
        <Box color="secondary.gray.200">
          <LinkOverlay as={Link} to={to}>
            <Heading as="h3" size="sm" fontWeight="medium">
              {title}
            </Heading>
          </LinkOverlay>

          <Text fontSize="xs">
            {isLoading ? <Skeleton width="70px" height="0.7rem" mt={2} /> : tracksCountMsg}
          </Text>
        </Box>

        {tracks.length && <PlayButtonWithOpacity playlist={tracks} />}
      </HStack>
    </LinkBox>
  );
}
