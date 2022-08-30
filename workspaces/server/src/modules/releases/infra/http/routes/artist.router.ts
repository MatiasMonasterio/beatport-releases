import { Router } from "express";

import { authenticatedGuard } from "../../../../auth";

import { artistsController, tracksController } from "../controllers";
import { artistsValidator, filtersValidator } from "../validators";
import { updateData } from "../middleware";

const artistRouter = Router();

artistRouter.get(
  "/",
  authenticatedGuard,
  filtersValidator.queryParams,
  updateData,
  artistsController.getAllArtists
);

artistRouter.post(
  "/",
  authenticatedGuard,
  artistsValidator.create,
  artistsController.createNewArtist
);

artistRouter.get("/releases", authenticatedGuard, updateData, tracksController.getArtistsReleases);

artistRouter.get("/upcomings", authenticatedGuard, updateData, tracksController.getArtistsUpcoming);

artistRouter.get(
  "/:id",
  authenticatedGuard,
  artistsValidator.idParam,
  updateData,
  artistsController.getOneArtist
);

artistRouter.delete(
  "/:id",
  authenticatedGuard,
  artistsValidator.idParam,
  artistsController.deteleOneArtist
);

artistRouter.get(
  "/:id/tracks",
  authenticatedGuard,
  artistsValidator.idParam,
  tracksController.getTracksByArtistId
);

export default artistRouter;
