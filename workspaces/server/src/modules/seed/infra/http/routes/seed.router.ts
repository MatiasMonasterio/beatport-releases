import { Router } from "express";

import { isDevelopment } from "../../../../../infra/http/middlewares";
import { seedController } from "../controllers";

const seedRouter = Router();

seedRouter.use("/", isDevelopment, seedController.generateData);

export default seedRouter;
