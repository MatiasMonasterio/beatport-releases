export interface AutorizationContext {
  user: UserState;
  login: (token: string) => void;
  logout: () => void;
}

export interface UserState {
  isLogged: boolean;
  username?: string;
  avatar?: string;
}

export interface Action {
  type: "login" | "logout";
  payload: Payload;
}

interface Payload {
  username?: string;
  avatar?: string;
}
