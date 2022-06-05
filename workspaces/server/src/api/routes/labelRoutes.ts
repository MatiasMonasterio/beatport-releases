import { Router } from "express";

import { isCached } from "../middleware";
import labelController from "../controllers/labelController";

const router = Router();

router.get("/", isCached, labelController.getAllLabels);
router.post("/", labelController.createNewLabel);
router.get("/releases", isCached, labelController.getLabelsReleases);
router.get("/upcomings", isCached, labelController.getLabelsUpcoming);
router.get("/:id", isCached, labelController.getOneLabel);
router.delete("/:id", labelController.deteleOneLabel);

export default router;
