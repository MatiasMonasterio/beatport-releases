import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Beat Releases API");
});

app.listen(3000, () => {
  console.log("Server init");
});

process.on("unhandledRejection", (err: Error) => {
  console.error(err.name, err.message);
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});
