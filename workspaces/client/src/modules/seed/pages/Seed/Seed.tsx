import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { LoadingView } from "components";
import { useHttpRequest } from "hooks";
import { MODE } from "config/env";

import { generateData } from "@/seed/services/seed";

export default function Seed() {
  const navigate = useNavigate();
  const toast = useToast();

  const { callRequest } = useHttpRequest();

  useEffect(() => {
    if (MODE === "production") navigate("/auth/login", { replace: true });

    callRequest(generateData)
      .then(() => {
        toast({
          title: "Seed generated",
          status: "success",
          isClosable: true,
          variant: "subtle",
          position: "bottom-right",
        });
      })
      .finally(() => {
        localStorage.clear();
        navigate("/auth/login", { replace: true });
      });
  }, []);

  return <LoadingView />;
}
