import { Box, CloseButton, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useWidget } from "context/widget";

export default function YoutubeWidget({ videoId }: { videoId: string }) {
  const { closeWidget } = useWidget();

  const handleCloseIframe = (): void => {
    closeWidget();
  };

  return (
    <motion.div drag dragConstraints={{ right: 0, bottom: 0 }} dragMomentum={false}>
      <Box
        mt={4}
        position="absolute"
        borderRadius="sm"
        right={10}
        bottom={5}
        zIndex={100}
        px={4}
        pb={4}
        pt={2}
        cursor="move"
        bgColor="rgba(0,0,0,0.3)"
      >
        <Flex justifyContent="end" mb={1}>
          <CloseButton color="gray.300" onClick={handleCloseIframe} />
        </Flex>

        <iframe
          width="400vw"
          height="250vh"
          src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </Box>
    </motion.div>
  );
}
