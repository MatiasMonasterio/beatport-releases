import { Router } from "express";

import { isDeveloment } from "../middleware";
import { seedController } from "../controllers";

const router = Router();

router.get("/", isDeveloment, seedController.generateData);

export default router;
