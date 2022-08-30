import type { NextFunction, Request, Response } from "express";
import type { SeedController } from "./seed.controller.d";

import { sendHttpResponse } from "../../../../../../infra/http/utilities";
import { seedService } from "../../../../services";

const seedController: SeedController = {
  generateData: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await seedService.generateData();
      sendHttpResponse({ res });
    } catch (error) {
      next(error);
    }
  },
};

export default seedController;
