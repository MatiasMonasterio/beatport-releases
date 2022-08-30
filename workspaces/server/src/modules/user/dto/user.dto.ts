import type {
  UserEmail,
  UserUsername,
  UserName,
  UserLastname,
  UserAvatar,
} from "../../../core/domain";

export interface UserDTO {
  username: UserUsername;
  email: UserEmail;
  name: UserName;
  lastname: UserLastname;
  avatar: UserAvatar;
}
