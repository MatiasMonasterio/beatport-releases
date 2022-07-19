import { useNavigate } from "react-router-dom";
import { Box, Container, Button, HStack } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

import GoBack from "./GoBack";
import GoNext from "./GoNext";
import Account from "./Account";
import Notification from "./Notification";

interface Props {
  isSolid: boolean;
}

export default function Navbar({ isSolid }: Props) {
  const navigate = useNavigate();

  const handleNavigateBack = () => navigate(-1);
  const handleNavigateNext = () => navigate(1);

  return (
    <Box position="sticky" top={0} zIndex={100}>
      <Box
        as="nav"
        position="absolute"
        w="100%"
        top={0}
        py={3}
        right={0}
        bgColor={isSolid ? "gray.900" : "transparent"}
        borderBottom="1px solid"
        borderColor={isSolid ? "gray.700" : "transparent"}
        boxShadow={isSolid ? "0 0 25px rgba(0,0,0,0.2)" : "none"}
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

          <HStack justifyContent="space-between">
            <HStack>
              <GoBack onClick={handleNavigateBack} />
              <GoNext onClick={handleNavigateNext} />
            </HStack>

            <HStack>
              <Notification />
              <Account />
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
