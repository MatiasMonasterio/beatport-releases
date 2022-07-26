import type { AutorizationContext } from "./types";

import { useContext } from "react";
import AuthorizationContext from "./AuthorizationContext";

export default function useAuthorization(): AutorizationContext {
  const ctx = useContext(AuthorizationContext);
  return ctx;
}
