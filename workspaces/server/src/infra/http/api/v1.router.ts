import { Router } from "express";

import { seedRouter } from "../../../modules/seed/infra/http/routes";
import { authRouter } from "../../../modules/auth/intra/http/routes";
import { usersRouter } from "../../../modules/user/infra/http/routes";
import {
  artistsRouter,
  labelsRouter,
  tracksRouter,
  favoritesRouter,
} from "../../../modules/releases/infra/http/routes";

const apiV1Router = Router();

apiV1Router.use("/seed", seedRouter);
apiV1Router.use("/auth", authRouter);
apiV1Router.use("/users", usersRouter);
apiV1Router.use("/artists", artistsRouter);
apiV1Router.use("/labels", labelsRouter);
apiV1Router.use("/tracks", tracksRouter);
apiV1Router.use("/favorites", favoritesRouter);

export default apiV1Router;
