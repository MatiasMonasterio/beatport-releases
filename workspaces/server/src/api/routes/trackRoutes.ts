import { Router } from "express";

import { isCached, isAuthenticated, updateData } from "../middleware";
import { trackController } from "../controllers";

const router = Router();

router.get("/releases", isAuthenticated, isCached, updateData, trackController.getAllReleases);
router.get("/upcomings", isAuthenticated, isCached, updateData, trackController.getAllUpcomings);

export default router;
