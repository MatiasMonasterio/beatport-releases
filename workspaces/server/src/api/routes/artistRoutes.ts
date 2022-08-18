import { Router } from "express";

import { isCached, isAuthenticated, updateData } from "../middleware";
import { artistController, trackController } from "../controllers";
import { artistValidator, filterValidator } from "../validators";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  filterValidator.queryParams,
  isCached,
  updateData,
  artistController.getAllArtists
);

router.post("/", isAuthenticated, artistValidator.create, artistController.createNewArtist);
router.get("/releases", isAuthenticated, isCached, updateData, trackController.getArtistsReleases);
router.get("/upcomings", isAuthenticated, isCached, updateData, trackController.getArtistsUpcoming);
router.get(
  "/:id",
  isAuthenticated,
  artistValidator.idParam,
  isCached,
  updateData,
  artistController.getOneArtist
);
router.delete("/:id", isAuthenticated, artistValidator.idParam, artistController.deteleOneArtist);
router.get(
  "/:id/tracks",
  isAuthenticated,
  artistValidator.idParam,
  isCached,
  trackController.getTracksByArtistId
);

export default router;
