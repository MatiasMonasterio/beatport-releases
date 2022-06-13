import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { BiSearch, BiX } from "react-icons/bi";

interface Props {
  placeholder: string;
  value?: string;
  width?: string;
}

export default function Search({ value = "", placeholder, width = "300px" }: Props) {
  const [inputValue, setInputValue] = useState<string>(value);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setInputValue(inputValue);
    setSearchParams({ search: inputValue });

    !inputValue && setSearchParams({});
  };

  const handleClearInput = () => {
    setInputValue("");
    setSearchParams({});
  };

  useEffect(() => {
    const searchValue = searchParams.get("search");
    searchValue && setInputValue(searchValue);
  }, []);

  return (
    <Box as="form" onSubmit={handleFormSubmit}>
      <InputGroup>
        <InputLeftElement color="gray.400">
          <BiSearch />
        </InputLeftElement>

        <Input
          borderColor="gray.500"
          fontSize="sm"
          onChange={handleInputChange}
          placeholder={placeholder}
          type="text"
          value={inputValue}
          width={width}
          h="2rem"
          bg="gray.700"
        />

        {inputValue && (
          <InputRightElement>
            <Button variant="link" onClick={handleClearInput} color="gray.200">
              <BiX />
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
}
