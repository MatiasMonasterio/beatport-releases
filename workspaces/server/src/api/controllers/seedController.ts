import type { Request, Response } from "express";

import { sendHttpResponse } from "../../utils";
import { seedService } from "../services";

const generateData = async (_req: Request, res: Response) => {
  await seedService.generateData();
  sendHttpResponse({ res });
};

export default {
  generateData,
};
