import { Box, Spinner } from "@chakra-ui/react";

export default function LoadingBg() {
  return (
    <Box
      position="absolute"
      display="flex"
      justifyContent="center"
      alignItems="center"
      top="0"
      w="100%"
      height="100%"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <Spinner size="lg" />
    </Box>
  );
}
