import type { UserCredentials } from "@br/core";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, FormControl, Input, Flex, Button, Link } from "@chakra-ui/react";

import { useFetch } from "hooks";

interface Props {
  onSubmit: ({ email, password }: UserCredentials) => Promise<void>;
}

const emptyForm = {
  email: "",
  password: "",
  confirm_password: "",
};

export default function RegisterForm({ onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);
  const { fetch, isLoading } = useFetch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();

    if (form.password !== form.confirm_password) return;
    await fetch<void>(async () => await onSubmit({ email: form.email, password: form.password }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

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

      <FormControl>
        <Input
          type="password"
          value={form.confirm_password}
          placeholder="confirm password"
          name="confirm_password"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </FormControl>

      <Flex
        mb={4}
        fontSize="xs"
        justifyContent="center"
        color="secondary.gray.700"
        lineHeight="1.2em"
        gap={1}
      >
        Already have and account?
        <Link as={NavLink} to="/auth/login">
          Go to login
        </Link>
      </Flex>

      <Button type="submit" variant="primary" w="100%" disabled={isLoading}>
        Register
      </Button>
    </Box>
  );
}
