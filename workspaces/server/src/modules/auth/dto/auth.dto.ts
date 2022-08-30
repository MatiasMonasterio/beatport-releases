import type { UserEmail, UserPassword } from "../../../core/domain";

export interface LoginDTO {
  email: UserEmail;
  password: UserPassword;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterDTO extends LoginDTO {}
