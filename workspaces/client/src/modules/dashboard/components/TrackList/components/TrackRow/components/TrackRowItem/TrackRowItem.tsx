import { Box } from "@chakra-ui/react";

interface Props {
  content: string | number;
}

export default function TrackRowItem({ content }: Props) {
  return (
    <Box
      fontSize="xs"
      py={{ base: 0, sm: 2 }}
      display={{ base: "none", sm: "block" }}
      alignSelf="center"
      color="secondary.gray.700"
    >
      {content}
    </Box>
  );
}
