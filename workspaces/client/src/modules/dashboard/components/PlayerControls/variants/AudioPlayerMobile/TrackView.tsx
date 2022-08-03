import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  VStack,
  Image,
  Container,
  Heading,
  HStack,
  Box,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";

import { usePlayer } from "@/dashboard/hooks";

import Timeline from "../Timeline";
import PlayButton from "../PlayButton";
import NextTrackButton from "../NextTrackButton";
import PrevTrackButton from "../PrevTrackButton";
import { usePlayerContext } from "@/dashboard/contexts/player";

interface Props {
  isVisible: boolean;
  onPlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onCloseView: () => void;
  onTimelineChange: (newTimeline: number) => void;
}

export default function TrackView({
  isVisible,
  onTimelineChange,
  onPlay,
  onNextTrack,
  onPrevTrack,
  onCloseView,
}: Props) {
  const { isPlaying, currentTrack, playlist, audioRef } = usePlayerContext();
  const { duration, currentTime } = usePlayer(audioRef);

  const isFirstTrack: boolean = useMemo(() => {
    return playlist.length > 0 && playlist[0].id === currentTrack?.id;
  }, [currentTrack, playlist]);

  const isLastTrack: boolean = useMemo(() => {
    return playlist.length > 0 && playlist[playlist.length - 1].id === currentTrack?.id;
  }, [currentTrack, playlist]);

  const handleCloseView = () => {
    onCloseView();
  };

  return (
    <VStack
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      backgroundColor="secondary.black.900"
      zIndex={101}
      transition="transform 0.2s"
      transitionDelay="0.1s"
      transform={!isVisible ? "translateY(100%)" : ""}
    >
      <Container py={4} width="100%">
        <Button variant="link" fontSize="4xl" onClick={handleCloseView}>
          <BiChevronDown />
        </Button>
      </Container>
      <Container display="flex" flexDirection="column" height="100%">
        <Box display="flex" flexGrow={1} alignItems="center" w="100%">
          <Image src={currentTrack?.artwork} w="100%" />
        </Box>

        <Box pb={10}>
          <Box mb={4}>
            <Heading size="md" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" mb={1}>
              {currentTrack?.name} {currentTrack?.mix}
            </Heading>

            <Text fontSize="sm">
              {currentTrack?.artists &&
                currentTrack.artists.map((artist) => (
                  <Link
                    as={NavLink}
                    key={artist.id}
                    to={`/artist/${artist.id}`}
                    _notLast={{ _after: { content: `", "` } }}
                    onClick={handleCloseView}
                  >
                    {artist.name}
                  </Link>
                ))}
            </Text>

            <Text fontSize="sm">
              <Link as={NavLink} to={`/label/${currentTrack?.label?.id}`} onClick={handleCloseView}>
                {currentTrack?.label?.name}
              </Link>
            </Text>
          </Box>

          <Timeline
            currentTime={currentTime}
            duration={duration}
            onTimelineChange={onTimelineChange}
          />

          <HStack justifyContent="center" gap={2}>
            <PrevTrackButton onClick={onPrevTrack} disabled={isFirstTrack} />
            <PlayButton onClick={onPlay} isPlaying={isPlaying} />
            <NextTrackButton onClick={onNextTrack} disabled={isLastTrack} />
          </HStack>
        </Box>
      </Container>
    </VStack>
  );
}
