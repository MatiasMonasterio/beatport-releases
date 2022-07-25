import { Router } from "express";

import { isAuthenticated } from "../middleware";
import userController from "../controllers/userController";

const router = Router();

router.get("/", isAuthenticated, userController.getUser);
router.post("/register", userController.createNewUser);
router.post("/login", userController.loginUser);

export default router;
