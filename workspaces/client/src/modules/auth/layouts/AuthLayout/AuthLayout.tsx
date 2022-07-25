import { Outlet } from "react-router-dom";
import { Center } from "@chakra-ui/react";

import MotionCenter from "./MotionCenter";

export default function AuthLayout() {
  return (
    <Center w="100%" h="100vh" bgColor={{ base: "secondary.black.800", sm: "inherit" }}>
      <MotionCenter
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
      </MotionCenter>
    </Center>
  );
}
