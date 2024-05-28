import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

import connectDB from "./server/db/db.js";
import userRoute from "./server/routes/userRoute.js";
import avatarRoute from "./server/routes/avatarRoute.js";
import createWebSocketServer from "./server/wsServer.js";

const app = express();

dotenv.config({
  path: `./.env`,
});

//database connection
connectDB();
app.use(express.json())
app.use(cookieParser())

//middlewares
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  // "http://localhost:4000",
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
app.use(cors(corsOptions)); //for dev
// app.use(cors());	//for production

app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Application Running on Port ${port}`));

createWebSocketServer(server); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')))
app.get("/", (req, res, next) => {res.sendFile(path.join(__dirname, 'dist', 'index.html'));});