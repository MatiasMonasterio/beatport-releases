import type { Track } from "types";
import type { WidgetState } from "./types";

import { INITIAL_VALUE } from "./WidgetProvider";

type widgetAction =
  | { type: "beatport"; payload: Track }
  | { type: "youtube"; payload: string }
  | { type: "spotify"; payload: null }
  | { type: "close" };

export const widgetReducer = (state: WidgetState, action: widgetAction): WidgetState => {
  switch (action.type) {
    case "beatport":
      return {
        ...INITIAL_VALUE,
        active: true,
        beatport: {
          active: true,
          track: action.payload,
        },
      };

    case "youtube":
      return {
        ...INITIAL_VALUE,
        active: true,
        youtube: {
          active: true,
          videoId: action.payload,
        },
      };

    case "close":
      return {
        ...INITIAL_VALUE,
      };

    default:
      return state;
  }
};
