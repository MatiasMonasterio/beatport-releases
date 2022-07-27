import { useState, useEffect } from "react";
import { useHttpRequest } from "hooks";

interface Args<T> {
  request: () => Promise<T>;
  defaultValue: T;
  deps?: React.DependencyList;
}

export default function useGetInitialData<T>({ request, defaultValue, deps }: Args<T>) {
  const [data, setdata] = useState<T>(defaultValue);
  const { callRequest, isLoading } = useHttpRequest();

  useEffect(
    () => {
      callRequest(request).then((response) => {
        setdata(response);
      });
    },
    deps ? deps : []
  );

  return { data, isLoading };
}
