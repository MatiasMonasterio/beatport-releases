import { Router } from "express";

import { isCached } from "../middleware";
import trackController from "../controllers/trackController";

const router = Router();

router.get("/releases", isCached, trackController.getAllReleases);
router.get("/upcomings", isCached, trackController.getAllUpcomings);

export default router;
