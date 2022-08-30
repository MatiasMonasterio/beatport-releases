import type { Request, Response, NextFunction } from "express";
import type { UsersController } from "./users.controller.d";

import { sendHttpResponse } from "../../../../../../infra/http/utilities";
import { usersService } from "../../../../services";

const usersController: UsersController = {
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.getOneById(req.decode.id);
      sendHttpResponse({ data: user, res });
    } catch (error) {
      next(error);
    }
  },
};

export default usersController;
