import { Image, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { BiUser, BiSlider, BiLogOut } from "react-icons/bi";

export default function Account() {
  return (
    <Menu>
      <MenuButton bg="gray.900" p={1} borderRadius="full" display={{ base: "none", sm: "flex" }}>
        <Image borderRadius="full" boxSize={8} src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
      </MenuButton>

      <MenuList bgColor="gray.900" color="gray.300" border="none" borderRadius="md" zIndex={101}>
        <MenuItem icon={<BiUser />} _hover={{ color: "gray.800" }}>
          Account
        </MenuItem>
        <MenuItem icon={<BiSlider />} _hover={{ color: "gray.800" }}>
          Settings
        </MenuItem>

        <MenuDivider />

        <MenuItem icon={<BiLogOut />} _hover={{ color: "gray.800" }}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
