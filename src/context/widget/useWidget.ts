import type { WidgetContextProps } from "./WidgetContext";

import { useContext } from "react";
import { WidgetContext } from "./WidgetContext";

export const useWidget = (): WidgetContextProps => {
  const ctx = useContext(WidgetContext);
  return ctx;
};
