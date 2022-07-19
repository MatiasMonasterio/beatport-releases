import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Text, Avatar } from "@chakra-ui/react";
import { BiUser, BiSlider, BiLogOut } from "react-icons/bi";

import { useAuthorization } from "contexts/authorization";

export default function Account() {
  const { jwtDecode, deleteToken } = useAuthorization();

  const handleSignOut = () => {
    deleteToken();
  };

  return (
    <Menu>
      <MenuButton bg="gray.900" p={1} borderRadius="full" display={{ base: "none", sm: "flex" }}>
        <Avatar borderRadius="full" boxSize={8} src={jwtDecode.avatar} name={jwtDecode.username} />
      </MenuButton>

      <MenuList
        bgColor="gray.800"
        borderColor="gray.600"
        color="gray.300"
        boxShadow="sm"
        borderRadius="md"
        fontSize="lg"
        zIndex={101}
        w="100px"
        mt="10px"
      >
        <MenuItem
          as={Link}
          to="/account"
          _focus={{ bgColor: "initial", color: "white" }}
          _hover={{ bgColor: "initial", color: "white" }}
          icon={<BiUser />}
        >
          <Text fontSize="md">Profile</Text>
        </MenuItem>
        <MenuItem
          as={Link}
          to="/account/settings"
          _focus={{ bgColor: "initial", color: "white" }}
          _hover={{ bgColor: "initial", color: "white" }}
          icon={<BiSlider />}
        >
          <Text fontSize="md">Settings</Text>
        </MenuItem>
        <MenuItem
          onClick={handleSignOut}
          _focus={{ bgColor: "initial", color: "white" }}
          _hover={{ bgColor: "initial", color: "white" }}
          icon={<BiLogOut />}
        >
          <Text fontSize="md">Sign Out</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
