import { Router } from "express";
import { authenticatedGuard } from "../../../../auth";
import { usersController } from "../controllers";

const userRouter = Router();

userRouter.get("/", authenticatedGuard, usersController.getUser);

export default userRouter;
