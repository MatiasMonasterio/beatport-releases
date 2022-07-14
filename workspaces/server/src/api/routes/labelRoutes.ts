import { Router } from "express";

import { isCached, isAuthenticated, updateData } from "../middleware";
import labelController from "../controllers/labelController";
import trackController from "../controllers/trackController";

const router = Router();

router.get("/", isAuthenticated, isCached, updateData, labelController.getAllLabels);
router.post("/", isAuthenticated, labelController.createNewLabel);
router.get("/releases", isAuthenticated, isCached, updateData, trackController.getLabelsReleases);
router.get("/upcomings", isAuthenticated, isCached, updateData, trackController.getLabelsUpcoming);
router.get("/:id", isAuthenticated, isCached, updateData, labelController.getOneLabel);
router.delete("/:id", isAuthenticated, labelController.deteleOneLabel);

export default router;
