import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useInputSearchValue() {
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const changeSearchValue = (newValue: string) => {
    setSearchValue(newValue);
    !newValue ? setSearchParams({}) : setSearchParams({ search: newValue });
  };

  const clearSearchValue = () => {
    setSearchValue("");
    setSearchParams({});
  };

  useEffect(() => {
    const searchValue = searchParams.get("search");
    searchValue && setSearchValue(searchValue);
  }, []);

  return {
    searchValue,
    changeSearchValue,
    clearSearchValue,
  };
}
