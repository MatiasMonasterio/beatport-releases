import { Box, Container, Image, Text, Flex } from "@chakra-ui/react";

interface Props {
  isSolid: boolean;
}

export default function Navbar({ isSolid }: Props) {
  return (
    <Box position="sticky" top={0} zIndex={2}>
      <Box
        as="nav"
        position="absolute"
        w="100%"
        top={0}
        py={4}
        zIndex={100}
        right={0}
        borderBottom="1px solid"
        borderColor={isSolid ? "gray.700" : "transparent"}
        bgColor={isSolid ? "gray.800" : "transparent"}
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
