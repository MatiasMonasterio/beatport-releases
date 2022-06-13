import type { Artist, Label } from "@br/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// check types!
export const useSearch = <T extends Artist | Label>(valueToFilter: T[]) => {
  const [results, setResults] = useState<T[]>([]);
  const [searchParams] = useSearchParams();

  const handleSearch = (searchValue: string) => {
    const results = valueToFilter.filter((value) => {
      return value.name.toLocaleLowerCase().includes(searchValue);
    });

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
