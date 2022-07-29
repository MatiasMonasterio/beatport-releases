import { Box, InputGroup, InputLeftElement, InputRightElement, Input } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

import { ClearButton } from "./components";
import { useSearchValue } from "./hooks";

interface Props {
  placeholder: string;
}

export default function Search({ placeholder }: Props) {
  const { searchValue, changeSearchValue, clearSearchValue } = useSearchValue();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
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
        />

        <InputRightElement>
          {searchValue && <ClearButton onClick={clearSearchValue} />}
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
