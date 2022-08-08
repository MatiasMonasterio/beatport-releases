import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";

import apiRoutes from "./api";
import { connectDatabases } from "./utils";
import { PORT, CLIENT_URL } from "./config/constants";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: CLIENT_URL }));

app.get("/", (_req, res) => {
  res.send("Beat Releases API");
});

app.use("/api", apiRoutes);

app.all("*", (req, _res, next) => {
  next({ status: 404, message: `Can't find ${req.originalUrl} on this server!` });
});

connectDatabases()
  .then(() => app.listen(PORT || 3001, () => console.log("Server init")))
  .catch((err) => console.error("Error: " + err));

process.on("unhandledRejection", (err: Error) => {
  console.error(err.name, err.message);
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});
