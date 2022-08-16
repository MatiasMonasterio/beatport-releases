import type { Request, Response } from "express";

import { seedService } from "../services";

const generateData = async (_req: Request, res: Response) => {
  await seedService.generateData();
  res.send({ status: "OK" });
};

export default {
  generateData,
};
