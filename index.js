import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./server/db/db.js";
import userRoute from "./server/routes/userRoute.js";
import avatarRoute from "./server/routes/avatarRoute.js";
import createWebSocketServer from "./server/wsServer.js";

const __dirname = path.resolve();

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
// app.use(cors(corsOptions)); //for dev
app.use(cors());	//for production

app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);
// console.log(process.env.SMTP_USER);
// console.log(process.env.SMTP_PASS);
const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Application Running on Port ${port}`));

createWebSocketServer(server); 
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './frontend/dist/index.html'), (err) => {
		if (err) {
			console.error('Error sending file:', err);
		}
	});
});