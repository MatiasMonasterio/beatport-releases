import { Router } from "express";

import { authenticatedGuard } from "../../../../auth";

import { updateData } from "../middleware";
import { favoritesController } from "../controllers";
import { favoriteValidator } from "../validators";

const router = Router();

router.get("/", authenticatedGuard, updateData, favoritesController.getAllFavorites);
router.post("/", authenticatedGuard, favoritesController.createNewFavorite);
router.delete(
  "/:id",
  authenticatedGuard,
  favoriteValidator.idParam,
  favoritesController.deleteOneFavorite
);

export default router;
