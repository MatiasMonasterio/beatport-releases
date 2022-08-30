import dayjs from "dayjs";

export default function getExpireTimeToday(): number {
  const currentTime = dayjs(new Date());
  const endOfDay = dayjs(new Date()).endOf("day");

  return endOfDay.diff(currentTime, "s");
}
