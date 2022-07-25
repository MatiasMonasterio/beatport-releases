import { Heading, Button, Text, Box } from "@chakra-ui/react";
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
    <>
      <Box mb={6} textAlign="center">
        <Heading as="h1" size="lg" fontWeight="medium">
          Beat Releases
        </Heading>

        <Text color="primary.green" fontSize="sm">
          Keep updated!
        </Text>
      </Box>

      <Button fontWeight="medium" borderRadius="4px" w="100%" onClick={loginWithGoogle}>
        <FcGoogle />
        <Text as="span" fontSize="sm" ml={2} color="secondary.black.900">
          Sign in with Google
        </Text>
      </Button>

      <Text fontSize="xs" my={2}>
        Or
      </Text>

      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}
