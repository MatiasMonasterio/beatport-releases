import type { Track } from "@br/core";

import { useMemo, lazy } from "react";
import { Link } from "react-router-dom";
import { Heading, Text, LinkBox, LinkOverlay, HStack, Box, Skeleton } from "@chakra-ui/react";

import { useGetInitialData } from "hooks";

const PlayButtonPlaylist = lazy(() => import("@/dashboard/components/PlayButtonPlaylist"));

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

  const tracksCountMessage: string = useMemo(() => {
    return tracks.length > 0 ? `${tracks.length} tracks` : "No tracks";
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

          <Text fontSize="sm">
            {isLoading ? <Skeleton width="70px" height="0.8rem" mt={2} /> : tracksCountMessage}
          </Text>
        </Box>

        {tracks.length && (
          <PlayButtonPlaylist
            size="sm"
            playlist={tracks}
            opacity={0}
            _groupFocusWithin={{ opacity: 1, pointerEvents: "initial" }}
            _groupHover={{ opacity: 1, pointerEvents: "initial" }}
          />
        )}
      </HStack>
    </LinkBox>
  );
}
