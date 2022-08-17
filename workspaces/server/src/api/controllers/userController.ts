import type { NextFunction, Request, Response } from "express";

import { sendHttpResponse } from "../../utils";
import { userService } from "../services";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUser(req.userId);
    sendHttpResponse({ data: user, res });
  } catch (error) {
    next(error);
  }
};

const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await userService.createNewUser(req.body);
    sendHttpResponse({ data: token, res });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await userService.loginUser(req.body);
    sendHttpResponse({ data: token, res });
  } catch (error) {
    next(error);
  }
};

export default {
  getUser,
  createNewUser,
  loginUser,
};
