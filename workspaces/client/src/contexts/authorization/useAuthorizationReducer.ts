import type { JwtDecode } from "@br/core";

import { useReducer } from "react";
import decode from "jwt-decode";

import { authorizationReducer } from "./authorizationReducer";
import { INITIAL_USER_STATE, AUTH_KEY } from "./constants";

const init = () => {
  const token = localStorage.getItem(AUTH_KEY);

  if (token) {
    const { username, avatar } = decode<JwtDecode>(token);
    return { isLogged: true, username, avatar };
  }

  return INITIAL_USER_STATE;
};

export default function useAuthorizationReducer() {
  const [state, dispatch] = useReducer(authorizationReducer, {}, init);
  return { state, dispatch };
}
