import { Router } from "express";

import { isCached, isAuthenticated, updateData } from "../middleware";
import { favoriteController } from "../controllers";

const router = Router();

router.get("/", isAuthenticated, isCached, updateData, favoriteController.getAllFavorites);
router.post("/", isAuthenticated, favoriteController.createNewFavorite);
router.delete("/:id", isAuthenticated, favoriteController.deleteOneFavorite);

export default router;
