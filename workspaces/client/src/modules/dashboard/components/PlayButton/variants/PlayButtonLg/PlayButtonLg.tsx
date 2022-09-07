import type { PlayButtonProps } from "@/dashboard/components/PlayButton/PlayButton";
import { PlayButton } from "@/dashboard/components";

export default function PlayButtonLg({ playlist }: PlayButtonProps) {
  return <PlayButton playlist={playlist} fontSize="3xl" px={3} py={7} />;
}
