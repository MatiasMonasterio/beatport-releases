import { Router } from "express";
import {
  artistRoutes,
  labelRoutes,
  userRoutes,
  trackRoutes,
  favoriteRoutes,
  seedRoutes,
} from "./routes";

const router = Router();

router.use("/artists", artistRoutes);
router.use("/labels", labelRoutes);
router.use("/users", userRoutes);
router.use("/tracks", trackRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/seed", seedRoutes);

export default router;
