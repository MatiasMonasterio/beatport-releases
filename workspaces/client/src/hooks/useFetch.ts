import { useState } from "react";
import { useToast } from "@chakra-ui/react";

interface useFetchResponse {
  isLoading: boolean;
  fetch: <T>(request: () => Promise<T>) => Promise<T>;
}

export const useFetch = (): useFetchResponse => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetch = async <T>(request: () => Promise<T>): Promise<T> => {
    try {
      setIsLoading(true);
      const response = await request();
      setIsLoading(false);

      return response;
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
        isClosable: true,
        variant: "subtle",
        position: "bottom-right",
      });

      return null as T;
    }
  };

  return {
    isLoading,
    fetch,
  };
};
