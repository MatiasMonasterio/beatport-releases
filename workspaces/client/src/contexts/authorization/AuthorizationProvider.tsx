import type { JwtDecode } from "@br/core";

import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

import { logout as authLogout } from "@/auth/services/auth";

import AuthorizationContext from "./AuthorizationContext";
import useAuthorizationReducer from "./useAuthorizationReducer";
import { AUTH_KEY } from "./constants";

interface Props {
  children: React.ReactNode;
}

export default function AuthorizationProvider({ children }: Props) {
  const navigate = useNavigate();

  const { state, dispatch } = useAuthorizationReducer();

  const login = (token: string): void => {
    if (typeof token === "string" && token !== "") {
      navigate("/", { replace: true });
      const { username, avatar } = decode<JwtDecode>(token);
      dispatch({ type: "login", payload: { username, avatar } });
      localStorage.setItem(AUTH_KEY, token);
    }
  };

  const logout = async (): Promise<void> => {
    await authLogout();
    navigate("/auth/login", { replace: true });
    dispatch({ type: "logout", payload: {} });
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthorizationContext.Provider value={{ user: state, login, logout }}>
      {children}
    </AuthorizationContext.Provider>
  );
}
