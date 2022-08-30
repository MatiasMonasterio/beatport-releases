import { Router } from "express";

import { authenticatedGuard } from "../../../../auth";

import { tracksController } from "../controllers";
import { updateData } from "../middleware";

const tracksRouter = Router();

tracksRouter.get("/releases", authenticatedGuard, updateData, tracksController.getAllReleases);
tracksRouter.get("/upcomings", authenticatedGuard, updateData, tracksController.getAllUpcomings);

export default tracksRouter;
