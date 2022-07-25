import type { UserCredentials } from "@br/core";

import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { useAuthorization } from "contexts/authorization";

import { RegisterForm } from "@/auth/components";
import { register } from "@/auth/services/auth";

export default function Register() {
  const { setToken } = useAuthorization();

  const registerWithGoogle = () => {
    console.log("register");
  };

  const handleRegister = async (credentials: UserCredentials) => {
    const token = await register(credentials);
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

      <Button fontWeight="medium" borderRadius="4px" w="100%" onClick={registerWithGoogle}>
        <FcGoogle />
        <Text as="span" fontSize="sm" ml={2} color="secondary.black.900">
          Sign up with Google
        </Text>
      </Button>

      <Text fontSize="xs" my={2}>
        Or
      </Text>

      <RegisterForm onSubmit={handleRegister} />
    </>
  );
}
