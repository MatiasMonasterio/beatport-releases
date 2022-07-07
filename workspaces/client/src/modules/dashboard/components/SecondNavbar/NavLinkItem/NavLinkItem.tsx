import { NavLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

interface Props {
  path: string;
  name: string;
}

export default function NavLinkItem({ path, name }: Props) {
  return (
    <Link
      _activeLink={{ color: "gray.300", borderColor: "#01FF95" }}
      _hover={{ color: "gray.300", borderColor: "gray.300" }}
      as={NavLink}
      borderBottom="2px solid"
      borderColor="transparent"
      color="gray.400"
      end
      fontWeight="normal"
      pb={4}
      px={4}
      to={path}
    >
      {name}
    </Link>
  );
}
