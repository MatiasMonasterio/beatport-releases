import type { Track } from "@br/core";

import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  HStack,
  Box,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { BiPlay } from "react-icons/bi";

import { useGetInitialData } from "hooks";
import { usePlayerContext } from "@/dashboard/contexts/player";

interface Props {
  title: string;
  to: string;
  request: () => Promise<Track[]>;
}

export default function FeedCard({ title, to, request }: Props) {
  const { loadPlaylist } = usePlayerContext();

  const { data: tracks, isLoading } = useGetInitialData({
    request: request,
    defaultValue: [],
  });

  const tracksCountMessage: string = useMemo(() => {
    return tracks.length > 0 ? `${tracks.length} tracks` : "No tracks";
  }, [tracks]);

  const handleClick = () => {
    loadPlaylist({ track: tracks[0], playlist: tracks });
  };

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
          <Button
            borderRadius="full"
            p={0}
            fontSize="2xl"
            color="secondary.black.700"
            onClick={handleClick}
            opacity={0}
            pointerEvents="none"
            _hover={{ transform: "scale(1.05)" }}
            _groupFocusWithin={{ opacity: 1, pointerEvents: "initial" }}
            _groupHover={{ opacity: 1, pointerEvents: "initial" }}
          >
            <BiPlay />
          </Button>
        )}
      </HStack>
    </LinkBox>
  );
}
