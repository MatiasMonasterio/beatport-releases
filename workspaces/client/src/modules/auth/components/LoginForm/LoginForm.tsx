import React, { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";

import { Box, FormControl, Input, Button, Flex, Link, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

import { useFetch } from "hooks";

interface Props {
  onSubmit: (form: { email: string; password: string }) => Promise<void>;
}

interface FormData {
  email: string;
  password: string;
}

const emptyForm = {
  email: "",
  password: "",
};

export default function LoginForm({ onSubmit }: Props) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormData>(emptyForm);

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
    <Box as="form" display="flex" flexDirection="column" gap={4} onSubmit={handleSubmit} w="100%">
      <FormControl>
        <Input
          type="text"
          value={form.email}
          name="email"
          placeholder="email"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </FormControl>

      <FormControl>
        <Input
          type="password"
          value={form.password}
          placeholder="password"
          name="password"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </FormControl>

      <Flex
        mb={4}
        fontSize="xs"
        justifyContent="space-between"
        color="secondary.gray.700"
        lineHeight="1.2em"
      >
        <Link as={NavLink} to="/auth/register">
          Don t have an account?
        </Link>

        <Link as={NavLink} to="/auth/recover">
          Forgot Password?
        </Link>
      </Flex>

      <Button type="submit" w="100%" variant="primary" disabled={isLoading}>
        Login
        <Text fontSize="md" as="span" transform="rotate(180deg)" ml={1}>
          <BiArrowBack />
        </Text>
      </Button>
    </Box>
  );
}
