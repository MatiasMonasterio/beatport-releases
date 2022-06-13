import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// check types!
export const useSearch = <T>(valueToFilter: T) => {
  const [results, setResults] = useState<T>([] as T);
  const [searchParams] = useSearchParams();

  const handleSearch = (searchValue: string) => {
    const vl = valueToFilter as { name: string }[];

    const results = vl.filter((value) => {
      return value.name.toLocaleLowerCase().includes(searchValue);
    }) as T;

    setResults(results);
  };

  useEffect(() => {
    const searchValue = searchParams.get("search");
    setResults(valueToFilter);
    searchValue && handleSearch(searchValue);
  }, [valueToFilter, searchParams]);

  return {
    results,
    handleSearch,
  };
};
