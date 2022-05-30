import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  handleRemoveArtist: () => Promise<void>;
}

export default function DeleteArtist({ handleRemoveArtist }: Props) {
  const handleClick = async () => {
    await handleRemoveArtist();
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<AiFillDelete />}
          variant="outline"
          onClick={handleClick}
        />
        <MenuList>
          <MenuItem command="⌘T">New Tab</MenuItem>
          <MenuItem command="⌘N">New Window</MenuItem>
          <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
          <MenuItem command="⌘O">Open File...</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
