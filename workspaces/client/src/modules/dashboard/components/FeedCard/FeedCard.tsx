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

interface Props {
  title: string;
  countTracks: number;
  to: string;
  isLoading: boolean;
  onPlay: () => void;
}

export default function FeedCard({ title, countTracks, to, isLoading, onPlay }: Props) {
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
            {isLoading ? (
              <Skeleton width="70px" height="0.8rem" mt={2} />
            ) : countTracks > 0 ? (
              `${countTracks} tracks`
            ) : (
              "No Tracks"
            )}
          </Text>
        </Box>

        {countTracks && (
          <Button
            borderRadius="full"
            p={0}
            fontSize="2xl"
            color="secondary.black.700"
            onClick={onPlay}
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
