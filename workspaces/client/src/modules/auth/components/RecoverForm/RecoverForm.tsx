import { NavLink } from "react-router-dom";
import { chakra, FormControl, FormErrorMessage, Input, Flex, Button, Link } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useHttpRequest } from "hooks";

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
});

const initialValues = {
  email: "",
};

interface Props {
  onSubmit: (email: string) => Promise<void>;
}

export default function RecoverForm({ onSubmit }: Props) {
  const { callRequest, isLoading } = useHttpRequest();

  const handleSubmit = async () => {
    await callRequest(async () => await onSubmit(formik.values.email));
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
    </chakra.form>
  );
}
