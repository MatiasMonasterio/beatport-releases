import type { UserId } from "../../../../core/domain";
import type { UserDTO } from "../../dto";

export interface UsersService {
  getOneById: (userId: UserId) => Promise<UserDTO>;
}
