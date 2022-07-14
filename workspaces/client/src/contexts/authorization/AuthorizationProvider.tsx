import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import AuthorizationContext from "./AuthorizationContext";

interface Props {
  children: React.ReactNode;
}

interface JwtDecode {
  username: string;
  avatar: string;
}

const LOCALSTORAGE_AUTH_KEY = "auth";

export default function AuthorizationProvider({ children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [token, setToken] = useState<string>("");
  const [jwtDecode, setJwtDecode] = useState({ username: "", avatar: "" });

  const handleSetToken = (value: string): void => {
    if (typeof value === "string" && value !== "") {
      localStorage.setItem(LOCALSTORAGE_AUTH_KEY, value);
      navigate("/");
      setToken(value);
    }
  };

  const deleteToken = () => {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
    navigate("/auth/login");
    setToken("");
  };

  useEffect(() => {
    const token = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

    if (token) {
      const { username, avatar } = decode(token) as JwtDecode;
      setJwtDecode({ username, avatar });
      setToken(token);
    } else {
      if (!pathname.includes("/auth/")) {
        navigate("/auth/login");
      }
    }
  }, []);

  return (
    <AuthorizationContext.Provider
      value={{
        token,
        jwtDecode,
        deleteToken,
        setToken: handleSetToken,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
}
