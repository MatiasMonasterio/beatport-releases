import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";

import apiRoutes from "./api";
import { routeNotFound, handleHttpError } from "./middleware";
import { connectDatabases } from "./utils";
import { PORT, CLIENT_URL } from "./config/constants";

const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.send("Beat Releases API"));
app.use("/api", apiRoutes);
app.all("*", routeNotFound);

app.use(handleHttpError);

connectDatabases()
  .then(() => app.listen(PORT || 3001, () => console.log("Server init")))
  .catch((err) => console.error("Error: " + err));

process.on("uncaughtException", (error: Error) => {
  console.error(error.name, error.message);
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  console.error(err.name, err.message);
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});
