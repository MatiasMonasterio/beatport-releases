import type { Track } from "@br/core";

import { Link as ReactLink } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Text,
  CloseButton,
  HStack,
  Link,
} from "@chakra-ui/react";
import { BiPlay } from "react-icons/bi";

import { useWidget } from "context/widget";

export default function BeatportWidget(props: { track: Track }) {
  const { artwork, artists, name, label, bpm, preview, mix, key } = props.track;
  const { closeWidget } = useWidget();

  return (
    <Flex
      position="absolute"
      right={8}
      bottom={4}
      bg="black"
      p={4}
      gap={6}
      align="center"
      color="gray.300"
      zIndex={10}
      rounded="sm"
    >
      <CloseButton position="absolute" right={0} top={-8} onClick={() => closeWidget()} />
      <Box>
        <Image boxSize="60px" src={artwork} />{" "}
      </Box>

      <Flex direction="column" fontSize="xs">
        <Heading as="h6" size="xs" fontWeight="normal">
          <Box as="span" fontWeight="bold">
            {name} {mix}
          </Box>
        </Heading>

        <HStack spacing={1}>
          {artists.map((artist, index) => (
            <ReactLink key={artist.id} to={`artist/${artist.id}`}>
              <Link>
                {artist.name}
                {index + 1 < artists.length && ","}
              </Link>
            </ReactLink>
          ))}
        </HStack>

        <ReactLink to={`label/${label.id}`}>
          <Link>{label.name}</Link>
        </ReactLink>
      </Flex>

      <Flex direction="column">
        <Flex gap={4} align="center">
          <Text color="teal.400" fontWeight="bold" fontSize="lg">
            02:00
          </Text>
          <Text>/</Text>
          <Text fontSize="sm">04:56</Text>
        </Flex>

        <Flex justifyContent="space-between">
          <Text fontSize="xs">{bpm} BPM</Text>
          <Text fontSize="xs">key: {key}</Text>
        </Flex>
      </Flex>

      <Box>
        <audio src={preview} autoPlay controls />
      </Box>

      <Button
        rounded="full"
        display="none"
        px={5}
        py={8}
        bg="gray.900"
        color="gray.300"
        fontSize="2xl"
        _hover={{ color: "white" }}
      >
        <BiPlay />
      </Button>
    </Flex>
  );
}
