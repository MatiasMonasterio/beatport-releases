import type { Track } from "@br/core";
import type { WidgetState } from "./types";

import { useReducer } from "react";

import { BeatportWidget, YoutubeWidget } from "@/dashboard/components";
import { WidgetContext } from "./WidgetContext";
import { widgetReducer } from "./widgetReducer";

export const INITIAL_VALUE: WidgetState = {
  active: false,
  beatport: {
    active: false,
    track: {} as Track,
  },
  youtube: {
    active: false,
    videoId: "",
  },
};

interface Props {
  children: React.ReactNode;
}

export default function WidgetProvider({ children }: Props): JSX.Element {
  const [widgetState, dispatch] = useReducer(widgetReducer, INITIAL_VALUE);
  const { beatport, youtube } = widgetState;

  const showBeatportWidget = (track: Track): void => {
    dispatch({ type: "beatport", payload: track });
  };

  const showYoutubeWidget = (videoId: string): void => {
    dispatch({ type: "youtube", payload: videoId });
  };

  const closeWidget = (): void => {
    dispatch({ type: "close" });
  };

  return (
    <WidgetContext.Provider value={{ showBeatportWidget, showYoutubeWidget, closeWidget }}>
      {children}

      {beatport.active && <BeatportWidget track={beatport.track} />}
      {youtube.active && <YoutubeWidget videoId={youtube.videoId} />}
    </WidgetContext.Provider>
  );
}
