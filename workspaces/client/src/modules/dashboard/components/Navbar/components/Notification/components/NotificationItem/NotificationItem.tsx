import { Link as NavLink } from "react-router-dom";
import { Box, Text, Link } from "@chakra-ui/react";

interface Props {
  title: string;
  message: string;
  secondMessage: string;
  to: string;
  onClick: () => void;
}

export default function NotificationItem({ title, message, secondMessage, to, onClick }: Props) {
  return (
    <Box role="group">
      <Text fontSize="xs" color="secondary.gray.700" _groupHover={{ color: "secondary.gray.500" }}>
        {title}
      </Text>

      <Text
        color="secondary.gray.200"
        fontSize="md"
        _groupHover={{ color: "secondary.gray.100" }}
        lineHeight="1.2em"
      >
        {message}
      </Text>

      <Text as="span">
        <Link as={NavLink} to={to} onClick={onClick} fontSize="xs" color="primary.green" mr={1}>
          {secondMessage}
        </Link>
        🚀
      </Text>
    </Box>
  );
}
