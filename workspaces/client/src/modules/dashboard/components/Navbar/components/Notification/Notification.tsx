import { useState } from "react";

import {
  Button,
  Box,
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import { BiBell } from "react-icons/bi";

import { NotificationItem } from "./components";

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
          color="secondary.gray.200"
          _active={{ color: "secondary.gray.100" }}
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
              bgColor: "primary.green",
              borderRadius: "full",
              bottom: 0,
              right: "-2px",
            }}
          >
            <BiBell />
          </Box>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        width={400}
        bgColor="secondary.black.800"
        borderColor="secondary.black.600"
        mt="12px"
        borderRadius="md"
      >
        <PopoverBody zIndex={102}>
          <NotificationItem
            title="New Releases | Today"
            message="5 new releases!"
            secondMessage="Go to releases!"
            to="/releases"
            onClick={onToggle}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
