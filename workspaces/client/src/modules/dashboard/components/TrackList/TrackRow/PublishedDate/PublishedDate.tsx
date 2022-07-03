import { useMemo } from "react";
import { Text } from "@chakra-ui/react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
  released: number;
}

export default function PublishedDate({ released }: Props) {
  const publishDate: string = useMemo(() => {
    return dayjs(released).fromNow();
  }, [released]);

  return <Text>{publishDate}</Text>;
}
