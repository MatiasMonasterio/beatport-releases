import { Router } from "express";

import { authController } from "../controllers/auth";
import { authenticatedGuard } from "../guards";
import { authValidator } from "../validators";

const authRouter = Router();

authRouter.post("/login", authValidator.login, authController.login);
authRouter.post("/register", authValidator.register, authController.register);
authRouter.post("/logout", authenticatedGuard, authController.logout);

export default authRouter;
