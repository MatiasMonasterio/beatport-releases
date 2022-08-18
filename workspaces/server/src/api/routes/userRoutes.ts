import { Router } from "express";

import { isAuthenticated } from "../middleware";
import { userController } from "../controllers";
import { userValidator } from "../validators";

const router = Router();

router.get("/", isAuthenticated, userController.getUser);
router.post("/register", userValidator.credentials, userController.createNewUser);
router.post("/login", userValidator.credentials, userController.loginUser);

export default router;
