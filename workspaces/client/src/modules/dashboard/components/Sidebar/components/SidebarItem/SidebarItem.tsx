import { NavLink } from "react-router-dom";
import { Link, Box } from "@chakra-ui/react";

interface Props {
  to: string;
  content: string;
  icon: React.ReactNode;
}

export default function SidebarItem({ to, content, icon }: Props) {
  return (
    <Link
      _activeLink={{
        bgColor: "secondary.gray.200",
        color: "secondary.black.900",
        _after: {
          content: `""`,
          h: "100%",
          display: "block",
          w: "3px",
          bgColor: "secondary.gray.200",
          right: -4,
          position: "absolute",
        },
      }}
      _hover={{
        bgColor: "secondary.gray.200",
        color: "secondary.black.900",
      }}
      color="secondary.gray.200"
      alignItems="center"
      as={NavLink}
      borderRadius="lg"
      display="flex"
      fontSize="sm"
      gap={2}
      p={2}
      position="relative"
      textDecoration="none"
      fontWeight="medium"
      to={to}
    >
      <Box as="span" fontSize="xl">
        {icon}
      </Box>
      {content}
    </Link>
  );
}
