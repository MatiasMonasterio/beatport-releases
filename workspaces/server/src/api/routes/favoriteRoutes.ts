import { Router } from "express";

import { isCached, isAuthenticated, updateData } from "../middleware";
import { favoriteController } from "../controllers";
import { favoriteValidator } from "../validators";

const router = Router();

router.get("/", isAuthenticated, isCached, updateData, favoriteController.getAllFavorites);
// todo
router.post("/", isAuthenticated, favoriteController.createNewFavorite);
router.delete(
  "/:id",
  isAuthenticated,
  favoriteValidator.idParam,
  favoriteController.deleteOneFavorite
);

export default router;
