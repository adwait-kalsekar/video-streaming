import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

// JSON options
const jsonOptions = {
  limit: "16kb",
};

// URL encoder options
const encoderOptions = {
  extended: true,
  limit: "16kb",
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json(jsonOptions));
app.use(express.urlencoded(encoderOptions));
app.use(express.static("public"));

export default app;
