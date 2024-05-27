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

connectDB();

app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

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