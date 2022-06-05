import { Router } from "express";

import { isCached } from "../middleware";
import artistController from "../controllers/artistController";

const router = Router();

router.get("/", isCached, artistController.getAllArtists);
router.post("/", artistController.createNewArtist);
router.get("/releases", isCached, artistController.getArtistsReleases);
router.get("/upcomings", isCached, artistController.getArtistsUpcoming);
router.get("/:id", isCached, artistController.getOneArtist);
router.delete("/:id", artistController.deteleOneArtist);

export default router;
