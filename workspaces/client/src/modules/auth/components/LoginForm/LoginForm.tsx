import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Box, FormControl, FormLabel, Input, Button, Flex, Link, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

import { useFetch } from "hooks";

interface Props {
  onSubmit: (form: { email: string; password: string }) => Promise<void>;
}

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm({ onSubmit }: Props) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormData>({ email: "", password: "" });

  const { fetch, isLoading } = useFetch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();

    fetch(async () => {
      await onSubmit(form);
    });
  };

  useEffect(() => {
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (email && password) setForm({ email, password });
  }, []);

  return (
    <Box as="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit} w="100%">
      <FormControl border="1px solid" borderRadius="4px" borderColor="gray.300" px={2} py={1}>
        <FormLabel mb={0} fontSize="xs" color="gray.500" fontWeight="normal" lineHeight="1em">
          E-mail
        </FormLabel>

        <Input
          variant="unstyled"
          type="text"
          value={form.email}
          fontSize="sm"
          name="email"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </FormControl>

      <FormControl border="1px solid" borderRadius="4px" borderColor="gray.300" px={2} py={1}>
        <FormLabel mb={0} fontSize="xs" color="gray.500" fontWeight="normal" lineHeight="1.2em">
          Password
        </FormLabel>
        <Input
          variant="unstyled"
          type="password"
          value={form.password}
          fontSize="sm"
          name="password"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </FormControl>

      <Flex mb={4} fontSize="xs" color="gray.500" justifyContent="space-between" lineHeight="1.2em">
        <Link>Don t have an account?</Link>
        <Link>Forgot Password?</Link>
      </Flex>

      <Button
        type="submit"
        w="100%"
        colorScheme="blue"
        borderRadius="4px"
        fontWeight="normal"
        fontSize="sm"
        disabled={isLoading}
      >
        Login
        <Text fontSize="md" as="span" transform="rotate(180deg)" ml={1}>
          <BiArrowBack />
        </Text>
      </Button>
    </Box>
  );
}
