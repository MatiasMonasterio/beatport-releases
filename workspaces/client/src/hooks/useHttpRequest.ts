import { useState } from "react";
import { useToast } from "@chakra-ui/react";

interface HttpRequesFunction {
  isLoading: boolean;
  callRequest: <T>(request: () => Promise<T>) => Promise<T>;
}

export default function useHttpRequest(): HttpRequesFunction {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callRequest = async <T>(request: () => Promise<T>): Promise<T> => {
    try {
      setIsLoading(true);
      const response = await request();
      setIsLoading(false);

      return response;
    } catch (error) {
      const err = error as Error;
      setIsLoading(false);

      toast({
        title: `${err.message}`,
        status: "error",
        isClosable: true,
        variant: "subtle",
        position: "bottom-right",
      });

      throw error;
    }
  };

  return {
    isLoading,
    callRequest,
  };
}
