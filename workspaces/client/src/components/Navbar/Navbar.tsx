import { useNavigate } from "react-router-dom";
import { Box, Container, Image, Text, Flex, Button } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  isSolid: boolean;
}

export default function Navbar({ isSolid }: Props) {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

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
        bgColor={isSolid ? "gray.800" : "transparent"}
      >
        <Container maxW="container.xl">
          <Button
            variant="link"
            fontSize="2xl"
            color="gray.300"
            justifyContent="left"
            onClick={handleNavigateBack}
            display={{ base: "flex", sm: "none" }}
          >
            <BiArrowBack />
          </Button>

          <Flex justify="end">
            <Flex
              gap={2}
              alignItems="center"
              bg="gray.900"
              w={190}
              p={1}
              borderRadius="full"
              display={{ base: "none", sm: "flex" }}
            >
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
