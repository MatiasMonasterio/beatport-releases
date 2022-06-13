import { Box, Container, HStack } from "@chakra-ui/react";
import NavLinkItem from "./NavLinkItem";

interface Props {
  routes: { path: string; name: string }[];
}

export default function SecondNavbar({ routes }: Props) {
  return (
    <Box borderBottom="1px solid" borderColor="gray.700" mb={6}>
      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <HStack>
          {routes.map((route) => (
            <NavLinkItem {...route} key={route.path} />
          ))}
        </HStack>
      </Container>
    </Box>
  );
}
