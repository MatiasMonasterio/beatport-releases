import { Router } from "express";
import { artistRoutes, labelRoutes, userRoutes, trackRoutes, favoriteRoutes } from "./routes";

const router = Router();

router.use("/artists", artistRoutes);
router.use("/labels", labelRoutes);
router.use("/users", userRoutes);
router.use("/tracks", trackRoutes);
router.use("/favorites", favoriteRoutes);

export default router;
