import { Box, Container, HStack } from "@chakra-ui/react";
import { Account, GoBackButton, GoNextButton, Notification } from "./components";

interface Props {
  isSolid: boolean;
}

export default function Navbar({ isSolid }: Props) {
  return (
    <Box position="sticky" top={0} zIndex={100}>
      <Box
        as="nav"
        position="absolute"
        w="100%"
        top={0}
        py={3}
        right={0}
        bgColor={isSolid ? "secondary.black.900" : "transparent"}
        borderBottom="1px solid"
        borderColor={isSolid ? "secondary.black.600" : "transparent"}
        boxShadow={isSolid ? "0 0 25px rgba(0,0,0,0.2)" : "none"}
      >
        <Container maxW="container.xl">
          <HStack justifyContent="space-between">
            <HStack>
              <GoBackButton />
              <GoNextButton />
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
