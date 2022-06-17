import { Router } from "express";

import { isCached } from "../middleware";
import artistController from "../controllers/artistController";
import trackController from "../controllers/trackController";

const router = Router();

router.get("/", isCached, artistController.getAllArtists);
router.post("/", artistController.createNewArtist);
router.get("/releases", isCached, trackController.getArtistsReleases);
router.get("/upcomings", isCached, trackController.getArtistsUpcoming);
router.get("/:id", isCached, artistController.getOneArtist);
router.delete("/:id", artistController.deteleOneArtist);

export default router;
