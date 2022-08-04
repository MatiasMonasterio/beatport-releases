import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const dateFromNow = (timestamp: number): string => {
  return dayjs(timestamp).fromNow();
};
