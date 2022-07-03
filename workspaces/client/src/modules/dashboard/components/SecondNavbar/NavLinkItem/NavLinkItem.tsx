import { NavLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

interface Props {
  path: string;
  name: string;
}

export default function NavLinkItem({ path, name }: Props) {
  return (
    <Link
      _activeLink={{ color: "gray.100", borderColor: "gray.100" }}
      _hover={{ color: "gray.100", borderColor: "gray.100" }}
      as={NavLink}
      borderBottom="2px solid"
      borderColor="transparent"
      color="gray.400"
      end
      fontWeight="bold"
      pb={4}
      px={6}
      to={path}
    >
      {name}
    </Link>
  );
}
