import { createContext } from "react";

export interface AutorizationContextProps {
  token: string;
  jwtDecode: { username: string; avatar: string };
  setToken: (value: string) => void;
  deleteToken: () => void;
}

export default createContext<AutorizationContextProps>({} as AutorizationContextProps);
