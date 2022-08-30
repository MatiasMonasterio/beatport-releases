import { NextFunction, Request, Response } from "express";
import { AuthController } from "./auth.controller.d";

import { LoginDTO, RegisterDTO } from "../../../../dto";
import { authService } from "../../../../services";

const authController: AuthController = {
  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const credentials: LoginDTO = req.body;

    try {
      const token = await authService.login(credentials);
      res.json({ data: token });
    } catch (error) {
      next(error);
    }
  },

  register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const creadentials: RegisterDTO = req.body;

    try {
      const token = await authService.register(creadentials);
      res.json({ data: token });
    } catch (error) {
      handleDbExceptions(error);
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const decode = req.decode;
    const { value: token, exp } = decode;

    try {
      await authService.logout(token, exp);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
};

// checkStatus: async
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDbExceptions = (error: any): void => {
  if (error.code === "P2002") {
    console.log(error.meta);
  }
};

export default authController;
