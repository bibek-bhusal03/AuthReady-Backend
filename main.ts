import express from "express";
import { createAuth } from "./src/auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./env";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./src/models/db";
dotenv.config();

const app = express();

connectDB();
app.use(
  cors({
    origin: function (origin, callback) {
      console.debug(`Origin: ${origin}`);
      if (!origin || env.WHITELISTED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
createAuth(app);

app.listen(env.PORT, (req, res) => {
  console.log(`Server listening on port ${env.PORT}`);
});
