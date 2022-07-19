import { useState } from "react";
import { Link as NavLink } from "react-router-dom";
import {
  Button,
  Box,
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  useDisclosure,
  Link,
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

      <PopoverContent
        width={400}
        bgColor="gray.800"
        borderColor="gray.600"
        mt="12px"
        borderRadius="md"
      >
        <PopoverBody zIndex={102}>
          <Box role="group">
            <Text fontSize="xs" color="gray.500" _groupHover={{ color: "gray.400" }}>
              New Releases | Today
            </Text>

            <Text
              color="gray.300"
              fontSize="md"
              _groupHover={{ color: "gray.200" }}
              lineHeight="1.2em"
            >
              5 new releases!
            </Text>

            <Text as="span">
              <Link
                as={NavLink}
                to="/releases"
                onClick={onToggle}
                fontSize="xs"
                color="#01FF95"
                mr={1}
              >
                Go to releases!
              </Link>
              🚀
            </Text>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
