import type { Request, Response } from "express";
import type { ErrorRequest } from "../../types";

import userService from "../services/userServices";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(req.userId);
    res.send({ status: "OK", data: user });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  try {
    const token = await userService.createNewUser(req.body);
    res.send({ status: "OK", data: token });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await userService.loginUser(req.body);
    res.send({ status: "OK", data: token });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

export default {
  getUser,
  createNewUser,
  loginUser,
};
