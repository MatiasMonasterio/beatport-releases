import { Router } from "express";

import { isCached, isAuthenticated, updateData } from "../middleware";
import artistController from "../controllers/artistController";
import trackController from "../controllers/trackController";

const router = Router();

router.get("/", isAuthenticated, isCached, updateData, artistController.getAllArtists);
router.post("/", isAuthenticated, artistController.createNewArtist);
router.get("/releases", isAuthenticated, isCached, updateData, trackController.getArtistsReleases);
router.get("/upcomings", isAuthenticated, isCached, updateData, trackController.getArtistsUpcoming);
router.get("/:id", isAuthenticated, isCached, updateData, artistController.getOneArtist);
router.delete("/:id", isAuthenticated, artistController.deteleOneArtist);
router.get("/:id/tracks", isAuthenticated, isCached, trackController.getTracksByArtistId);

export default router;
