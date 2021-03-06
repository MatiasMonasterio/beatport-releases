import type { UserCredentials } from "@br/core";

import { NavLink } from "react-router-dom";
import { chakra, FormControl, FormErrorMessage, Input, Flex, Button, Link } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useHttpRequest } from "hooks";

interface Props {
  onSubmit: (credentials: UserCredentials) => Promise<void>;
}

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirm_password: Yup.string().required(),
});

const initialValues = {
  email: "",
  password: "",
  confirm_password: "",
};

export default function RegisterForm({ onSubmit }: Props) {
  const { callRequest, isLoading } = useHttpRequest();

  const handleSubmit = async () => {
    await callRequest(
      async () =>
        await onSubmit({
          email: formik.values.email,
          password: formik.values.password,
        })
    );
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <chakra.form
      display="flex"
      flexDirection="column"
      w="100%"
      gap={4}
      onSubmit={formik.handleSubmit}
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
          placeholder="password"
          name="password"
          disabled={isLoading}
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!(formik.submitCount && formik.errors.confirm_password)}>
        <Input
          type="password"
          placeholder="confirm password"
          name="confirm_password"
          disabled={isLoading}
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
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
    </chakra.form>
  );
}
