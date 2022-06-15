import { Router } from "express";

import userController from "../controllers/userController";

const router = Router();

router.post("/", userController.createNewUser);

export default router;
