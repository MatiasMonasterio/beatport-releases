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
      bgColor="gray.700"
      p={4}
      backdropBlur="2px"
      borderRadius="lg"
      _hover={{ bgColor: "gray.600" }}
      role="group"
      pt={16}
    >
      <HStack justifyContent="space-between">
        <Box>
          <LinkOverlay as={Link} to={to}>
            <Heading as="h2" size="sm">
              {title}
            </Heading>
          </LinkOverlay>

          <Text fontSize="sm" color="gray.400">
            {isLoading ? (
              <Skeleton
                width="70px"
                height="0.8rem"
                startColor="gray.700"
                endColor="gray.600"
                mt={2}
              />
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
            bgColor="gray.100"
            color="gray.800"
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
