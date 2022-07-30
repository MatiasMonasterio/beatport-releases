import { NavLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

interface Props {
  path: string;
  name: string;
}

export default function NavLinkItem({ path, name }: Props) {
  return (
    <Link
      _activeLink={{ color: "secondary.gray.200", borderColor: "primary.green" }}
      _hover={{ color: "secondary.gray.200", borderColor: "secondary.gray.200" }}
      as={NavLink}
      borderBottom="2px solid"
      borderColor="transparent"
      color="secondary.gray.400"
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
