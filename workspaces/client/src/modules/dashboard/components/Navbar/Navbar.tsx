import { useLocation } from "react-router-dom";
import { Box, Container, HStack, Flex } from "@chakra-ui/react";
import { Search } from "@/dashboard/components";
import { Account, GoBackButton, GoNextButton, Notification } from "./components";

interface Props {
  isSolid: boolean;
}

export default function Navbar({ isSolid }: Props) {
  const location = useLocation();

  const handleSearch = (searchValue: string) => {
    console.log({ searchValue });
  };

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
          <Flex w="100%">
            <HStack>
              <GoBackButton />
              <GoNextButton />
            </HStack>

            {location.pathname === "/search" && (
              <Box ml={5}>
                <Search
                  placeholder="Qué te interesa escuchar?"
                  bg="gray.100"
                  color="gray.900"
                  queryParamName="q"
                  onSearch={handleSearch}
                />
              </Box>
            )}

            <HStack ml="auto">
              <Notification />
              <Account />
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
