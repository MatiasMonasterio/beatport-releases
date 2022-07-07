import { Link } from "react-router-dom";
import { Image, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { BiUser, BiSlider, BiLogOut } from "react-icons/bi";

export default function Account() {
  return (
    <Menu>
      <MenuButton bg="gray.900" p={1} borderRadius="full" display={{ base: "none", sm: "flex" }}>
        <Image borderRadius="full" boxSize={8} src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
      </MenuButton>

      <MenuList
        bgColor="gray.800"
        color="gray.300"
        border="none"
        boxShadow="sm"
        borderRadius="3px"
        fontSize="lg"
        zIndex={101}
        w="100px"
        mt="5px"
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
          as={Link}
          to="/auth/login"
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
