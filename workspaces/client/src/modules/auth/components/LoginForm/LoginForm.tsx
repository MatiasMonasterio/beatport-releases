import type { UserCredentials } from "@br/core";

import { useSearchParams, NavLink } from "react-router-dom";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { FormControl, Input, FormErrorMessage } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useHttpRequest } from "hooks";

interface Props {
  onSubmit: (credentials: UserCredentials) => Promise<void>;
}

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function LoginForm({ onSubmit }: Props) {
  const [searchParams] = useSearchParams();
  const { callRequest, isLoading } = useHttpRequest();

  const initialValues: UserCredentials = {
    email: searchParams.get("email") || "",
    password: searchParams.get("password") || "",
  };

  const handleSubmit = () => {
    callRequest(async () => await onSubmit(formik.values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      as="form"
      display="flex"
      flexDirection="column"
      gap={4}
      onSubmit={(e) => formik.handleSubmit(e as React.FormEvent<HTMLFormElement> | undefined)}
      w="100%"
    >
      <FormControl isInvalid={!!(formik.submitCount && formik.errors.email)}>
        <Input
          type="text"
          name="email"
          placeholder="email"
          disabled={isLoading}
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!(formik.submitCount && formik.errors.password)}>
        <Input
          type="password"
          name="password"
          placeholder="password"
          disabled={isLoading}
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
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
