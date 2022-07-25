import { Box, Heading } from "@chakra-ui/react";

import { RecoverForm } from "@/auth/components";

export default function Recover() {
  const handleRecover = async () => {
    console.log("recover");
  };

  return (
    <>
      <Box mb={6} textAlign="center">
        <Heading as="h1" size="lg" fontWeight="medium">
          Recover Password
        </Heading>
      </Box>

      <RecoverForm onSubmit={handleRecover} />
    </>
  );
}
