import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, FormControl, Input, Flex, Button, Link } from "@chakra-ui/react";

import { useFetch } from "hooks";

interface Props {
  onSubmit: (email: string) => Promise<void>;
}

export default function RecoverForm({ onSubmit }: Props) {
  const [form, setForm] = useState({ email: "" });
  const { fetch, isLoading } = useFetch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    await fetch(async () => await onSubmit(form.email));
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

      <Flex
        mb={4}
        fontSize="xs"
        justifyContent="center"
        color="secondary.gray.700"
        lineHeight="1.2em"
        gap={1}
      >
        <Link as={NavLink} to="/auth/login">
          Return to login
        </Link>
      </Flex>

      <Button type="submit" w="100%" variant="primary" disabled={isLoading}>
        Send
      </Button>
    </Box>
  );
}
