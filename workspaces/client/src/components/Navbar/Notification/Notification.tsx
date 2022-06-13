import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiBell } from "react-icons/bi";

// problems with type in react 18
// https://github.com/chakra-ui/chakra-ui/issues/5896
const PopoverTrigger: React.FC<{ children: React.ReactNode }> = OrigPopoverTrigger;

export default function Notification() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [hasNotification, setHasNotification] = useState<boolean>(true);

  const handleOpenNotifications = () => {
    setHasNotification(false);
    onToggle();
  };

  return (
    <Popover direction="rtl" placement="bottom-end" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          variant="link"
          fontSize="xl"
          color="gray.300"
          p={2}
          onClick={handleOpenNotifications}
        >
          <Box
            position="relative"
            _after={{
              content: `""`,
              display: hasNotification ? "block" : "none",
              position: "absolute",
              width: 2,
              height: 2,
              bgColor: "#01FF95",
              borderRadius: "full",
              bottom: 0,
              right: "-2px",
            }}
          >
            <BiBell />
          </Box>
        </Button>
      </PopoverTrigger>

      <PopoverContent width={200} bgColor="gray.700" border="none">
        <PopoverHeader fontWeight="semibold">Notifications</PopoverHeader>
        <PopoverArrow bgColor="gray.700" borderColor="gray.600" />

        <PopoverBody zIndex={102}>
          <Link to="/artists" onClick={onToggle}>
            <Text fontSize="sm" fontWeight="medium">
              5 new releases
            </Text>

            <Text fontSize="xs" color="gray.400">
              Today
            </Text>
          </Link>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
