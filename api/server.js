import serverless from "serverless-http";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

import connectDB from "../server/db/db.js";
import userRoute from "../server/routes/userRoute.js";
import avatarRoute from "../server/routes/avatarRoute.js";
import createWebSocketServer from "../server/wsServer.js";

const app = express();

dotenv.config({
  path: `./.env`,
});

// Database connection
connectDB();
app.use(express.json());
app.use(cookieParser());

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://my-chat-sphere.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions)); // For development

app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// Serve static files from the dist directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const server = app.listen(0, () => console.log(`Application Running`)); // Listening on a dynamic port
createWebSocketServer(server);

export const handler = serverless(app);
