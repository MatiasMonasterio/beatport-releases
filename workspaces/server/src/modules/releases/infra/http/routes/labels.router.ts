import { Router } from "express";

import { authenticatedGuard } from "../../../../auth";

import { updateData } from "../middleware";
import { labelsController, tracksController } from "../controllers";
import { filtersValidator, labelValidator } from "../validators";

const labelRouter = Router();

labelRouter.get(
  "/",
  authenticatedGuard,
  filtersValidator.queryParams,
  updateData,
  labelsController.getAllLabels
);
labelRouter.post("/", authenticatedGuard, labelValidator.create, labelsController.createNewLabel);
labelRouter.get("/releases", authenticatedGuard, updateData, tracksController.getLabelsReleases);
labelRouter.get("/upcomings", authenticatedGuard, updateData, tracksController.getLabelsUpcoming);
labelRouter.get(
  "/:id",
  authenticatedGuard,
  labelValidator.idParam,
  updateData,
  labelsController.getOneLabel
);
labelRouter.delete(
  "/:id",
  authenticatedGuard,
  labelValidator.idParam,
  labelsController.deteleOneLabel
);
labelRouter.get(
  "/:id/tracks",
  authenticatedGuard,
  labelValidator.idParam,
  tracksController.getTracksByLabelId
);

export default labelRouter;
