import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./db/db.js";
import userRoute from "./routes/userRoute.js";
import avatarRoute from "./routes/avatarRoute.js";
import createWebSocketServer from "./wsServer.js";

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
  "http://localhost:4000",
	"https://chatsphere-a821.onrender.com",
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



const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Application Running on Port ${port}`));

createWebSocketServer(server); 