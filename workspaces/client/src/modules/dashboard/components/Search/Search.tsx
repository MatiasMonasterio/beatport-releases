import type { InputProps } from "@chakra-ui/react";
import { Box, InputGroup, InputLeftElement, InputRightElement, Input } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

import { ClearButton } from "./components";
import { useSearchValue } from "./hooks";

interface Props extends InputProps {
  placeholder: string;
  onSearch?: (searchValue: string) => void;
}

export default function Search({ placeholder, onSearch, ...args }: Props) {
  const { searchValue, changeSearchValue, clearSearchValue } = useSearchValue();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    onSearch && onSearch(searchValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    changeSearchValue(inputValue);
  };

  return (
    <Box as="form" onSubmit={handleFormSubmit} minW="350px">
      <InputGroup>
        <InputLeftElement>
          <BiSearch />
        </InputLeftElement>

        <Input
          fontSize="sm"
          w="100%"
          h={9}
          onChange={handleInputChange}
          placeholder={placeholder}
          type="text"
          value={searchValue}
          {...args}
        />

        <InputRightElement>
          {searchValue && <ClearButton onClick={clearSearchValue} />}
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
