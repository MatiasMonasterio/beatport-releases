import type { UserState, Action } from "./types";
import { INITIAL_USER_STATE } from "./constants";

export const authorizationReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case "login":
      return {
        isLogged: true,
        username: action.payload.username,
        avatar: action.payload.avatar,
      };
    case "logout":
      return INITIAL_USER_STATE;
    default: {
      return state;
    }
  }
};
