import { useMemo } from "react";
import { Text } from "@chakra-ui/react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
  createdAt: number;
}

export default function FavoriteDate({ createdAt }: Props) {
  const favoriteDate: string = useMemo(() => {
    return dayjs(createdAt).fromNow();
  }, [createdAt]);

  return <Text>{favoriteDate}</Text>;
}
