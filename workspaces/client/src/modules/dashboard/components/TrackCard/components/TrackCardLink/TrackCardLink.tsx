import { NavLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

interface Props {
  content: string;
  to: string;
  size?: string;
}

export default function TrackCardLink({ content, to, size }: Props) {
  return (
    <Link
      as={NavLink}
      to={to}
      fontSize={size ? size : "xs"}
      lineHeight={1}
      _notLast={{ _after: { content: `", "` } }}
    >
      {content}
    </Link>
  );
}
