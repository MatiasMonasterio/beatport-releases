import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Text, Avatar } from "@chakra-ui/react";
import { BiUser, BiSlider, BiLogOut } from "react-icons/bi";

import { useAuthorization } from "contexts/authorization";

export default function Account() {
  const { user, logout } = useAuthorization();

  const handleSignOut = () => {
    logout();
  };

  return (
    <Menu>
      <MenuButton
        bgColor="secondary.black.900"
        p={1}
        borderRadius="full"
        display={{ base: "none", sm: "flex" }}
      >
        <Avatar borderRadius="full" boxSize={8} src={user.avatar} name={user.username} />
      </MenuButton>

      <MenuList
        bgColor="secondary.black.800"
        borderColor="secondary.black.600"
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
          _focus={{ bgColor: "initial", color: "secondary.gray.100" }}
          _hover={{ bgColor: "initial", color: "secondary.gray.100" }}
          icon={<BiUser />}
        >
          <Text fontSize="md">Profile</Text>
        </MenuItem>
        <MenuItem
          as={Link}
          to="/account/settings"
          _focus={{ bgColor: "initial", color: "secondary.gray.100" }}
          _hover={{ bgColor: "initial", color: "secondary.gray.100" }}
          icon={<BiSlider />}
        >
          <Text fontSize="md">Settings</Text>
        </MenuItem>
        <MenuItem
          onClick={handleSignOut}
          _focus={{ bgColor: "initial", color: "secondary.gray.100" }}
          _hover={{ bgColor: "initial", color: "secondary.gray.100" }}
          icon={<BiLogOut />}
        >
          <Text fontSize="md">Sign Out</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
