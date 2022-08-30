import type { UserId } from "../../../../core/domain";
import type { UsersService } from "./users.service.d";

import { HttpException } from "../../../../core";

import { UserDTO } from "../../dto";
import { userMapper } from "../../mapper";
import { usersRepository } from "../../repositories";

const usersService: UsersService = {
  getOneById: async (userId: UserId): Promise<UserDTO> => {
    const user = await usersRepository.getOneById(userId);
    if (!user || !user.active) throw new HttpException(404, "User not found");

    return userMapper.persistenceToDTO(user);
  },
};

export default usersService;
