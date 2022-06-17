import { Router } from "express";

import { isCached } from "../middleware";
import favoriteController from "../controllers/favoriteController";

const router = Router();

router.get("/", isCached, favoriteController.getAllFavorites);
router.post("/", favoriteController.createNewFavorite);
router.delete("/:id", favoriteController.deleteOneFavorite);

export default router;
