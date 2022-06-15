import { Router } from "express";

import artistRoutes from "./artistRoutes";
import labelRoutes from "./labelRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/api/artists", artistRoutes);
router.use("/api/labels", labelRoutes);
router.use("/api/users", userRoutes);

export default router;
