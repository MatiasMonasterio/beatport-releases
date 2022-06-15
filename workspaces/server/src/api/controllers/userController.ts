import type { Request, Response } from "express";
import type { ErrorRequest } from "../../types";

import userService from "../services/userServices";

const createNewUser = async (req: Request, res: Response) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    res.status(400).send({ status: "FAILED", data: { error: "user is missing or invalid" } });
    return;
  }

  try {
    const user = await userService.createNewArtist(req.body);
    res.send({ status: "OK", data: user });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

export default {
  createNewUser,
};
