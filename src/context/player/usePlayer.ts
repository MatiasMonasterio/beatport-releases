import type { PlayerContextProps } from "./PlayerContext";

import { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

export const usePlayer = (): PlayerContextProps => {
  const ctx = useContext(PlayerContext);
  return ctx;
};
