import { Router } from "express";

import { isCached, isAuthenticated, updateData } from "../middleware";
import { labelController, trackController } from "../controllers";
import { labelValidator, filterValidator } from "../validators";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  filterValidator.queryParams,
  isCached,
  updateData,
  labelController.getAllLabels
);
router.post("/", isAuthenticated, labelValidator.create, labelController.createNewLabel);
router.get("/releases", isAuthenticated, isCached, updateData, trackController.getLabelsReleases);
router.get("/upcomings", isAuthenticated, isCached, updateData, trackController.getLabelsUpcoming);
router.get(
  "/:id",
  isAuthenticated,
  labelValidator.idParam,
  isCached,
  updateData,
  labelController.getOneLabel
);
router.delete("/:id", isAuthenticated, labelValidator.idParam, labelController.deteleOneLabel);
router.get(
  "/:id/tracks",
  isAuthenticated,
  labelValidator.idParam,
  isCached,
  trackController.getTracksByLabelId
);

export default router;
