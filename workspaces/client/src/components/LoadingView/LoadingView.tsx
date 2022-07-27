import { Center, Spinner } from "@chakra-ui/react";

export default function LoadingView() {
  return (
    <Center h="100vh">
      <Spinner size="xl" />
    </Center>
  );
}
