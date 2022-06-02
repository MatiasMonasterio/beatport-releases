import { Router } from "express";

import artistRoutes from "./artistRoutes";

const router = Router();

router.use("/api/artists", artistRoutes);

export default router;
