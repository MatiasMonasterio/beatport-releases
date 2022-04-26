import { Box, Container, Image, Text, Flex } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box position="sticky" top={0}>
      <Box
        as="nav"
        position="absolute"
        w="100%"
        top={0}
        bg="transparent"
        py={6}
        zIndex={10}
        right={0}
      >
        <Container maxW="container.xl">
          <Flex justify="end">
            <Flex gap={2} alignItems="center" bg="gray.900" w={190} p={1} borderRadius="full">
              <Image
                borderRadius="full"
                boxSize="28px"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />

              <Text fontWeight="bold">Dan Abramov</Text>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
