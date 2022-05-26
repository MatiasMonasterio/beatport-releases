import type { Track } from "types";
import { createContext } from "react";

export type WidgetContextProps = {
  showBeatportWidget: (track: Track) => void;
  showYoutubeWidget: (videoId: string) => void;
  closeWidget: () => void;
};

export const WidgetContext = createContext<WidgetContextProps>({} as WidgetContextProps);
