import { Link as ReactLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

interface Props {
  artist: { id: number; name: string };
}

export default function ArtistLink({ artist }: Props) {
  return (
    <Link as={ReactLink} to={`/artist/${artist.id}`} _notLast={{ _after: { content: `", "` } }}>
      {artist.name}
    </Link>
  );
}
