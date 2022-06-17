import { Router } from "express";

import { isCached } from "../middleware";
import labelController from "../controllers/labelController";
import trackController from "../controllers/trackController";

const router = Router();

router.get("/", isCached, labelController.getAllLabels);
router.post("/", labelController.createNewLabel);
router.get("/releases", isCached, trackController.getLabelsReleases);
router.get("/upcomings", isCached, trackController.getLabelsUpcoming);
router.get("/:id", isCached, labelController.getOneLabel);
router.delete("/:id", labelController.deteleOneLabel);

export default router;
