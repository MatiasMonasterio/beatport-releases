import { Outlet } from "react-router-dom";
import { Center } from "@chakra-ui/react";

export default function AuthLayout() {
  return (
    <Center w="100%" h="100vh">
      <Center
        bgColor="secondary.black.800"
        px={8}
        py={10}
        h={{ base: "100vh", sm: "auto" }}
        flexDir="column"
        borderRadius="md"
        width="450px"
        maxWidth="100%"
      >
        <Outlet />
      </Center>
    </Center>
  );
}
