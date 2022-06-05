import { Router } from "express";

import artistRoutes from "./artistRoutes";
import labelRoutes from "./labelRoutes";

const router = Router();

router.use("/api/artists", artistRoutes);
router.use("/api/labels", labelRoutes);

export default router;
