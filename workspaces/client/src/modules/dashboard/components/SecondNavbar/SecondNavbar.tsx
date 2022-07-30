import { HStack } from "@chakra-ui/react";
import { NavLinkItem } from "./components";

interface Props {
  routes: { path: string; name: string }[];
}

export default function SecondNavbar({ routes }: Props) {
  return (
    <HStack
      spacing={4}
      w="100%"
      borderBottom="1px solid"
      borderColor="secondary.black.600"
      mt={{ base: 16, sm: 20 }}
      mb={8}
    >
      {routes.map((route) => (
        <NavLinkItem {...route} key={route.path} />
      ))}
    </HStack>
  );
}
