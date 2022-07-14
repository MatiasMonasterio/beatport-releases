import { Heading, Center, Button, Text, Box } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { useAuthorization } from "contexts/authorization";

import { LoginForm } from "@/auth/components";
import { login, loginWithGoogle } from "@/auth/services/auth";

export default function Login() {
  const { setToken } = useAuthorization();

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    const token = await login(credentials);
    if (token !== "") setToken(token);
  };

  return (
    <Center bg="gray.900" w="100%" h="100vh">
      <Center bg="gray.100" px={8} py={10} flexDir="column" borderRadius="4px" minWidth="450px">
        <Box mb={6} textAlign="center">
          <Heading as="h1" size="lg" fontWeight="medium">
            Beat Releases
          </Heading>

          <Text color="gray.500" fontSize="sm">
            Keep updated!
          </Text>
        </Box>

        <Button
          fontWeight="medium"
          borderRadius="4px"
          w="100%"
          border="1px solid"
          borderColor="gray.300"
          onClick={loginWithGoogle}
        >
          <FcGoogle />
          <Text as="span" fontSize="sm" ml={2} color="gray.500">
            Sign in with Google
          </Text>
        </Button>

        <Text fontSize="xs" color="gray.500" my={2}>
          Or
        </Text>

        <LoginForm onSubmit={handleSubmit} />
      </Center>
    </Center>
  );
}
