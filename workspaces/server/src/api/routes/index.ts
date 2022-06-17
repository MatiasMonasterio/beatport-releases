import { Router } from "express";

import artistRoutes from "./artistRoutes";
import labelRoutes from "./labelRoutes";
import userRoutes from "./userRoutes";
import trackRoutes from "./trackRoutes";
import favoriteRoutes from "./favoriteRoutes";

const router = Router();

router.use("/api/artists", artistRoutes);
router.use("/api/labels", labelRoutes);
router.use("/api/users", userRoutes);
router.use("/api/tracks", trackRoutes);
router.use("/api/favorites", favoriteRoutes);

export default router;
