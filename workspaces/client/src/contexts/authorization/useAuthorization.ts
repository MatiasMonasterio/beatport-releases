import type { AutorizationContextProps } from "./AuthorizationContext";

import { useContext } from "react";
import AuthorizationContext from "./AuthorizationContext";

export default function useAuthorization(): AutorizationContextProps {
  const ctx = useContext(AuthorizationContext);
  return ctx;
}
