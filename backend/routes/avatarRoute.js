import express from "express";
import { avatarController, getAllAvatars } from "../controllers/avatarController.js";

const router = express.Router();

router.post("/", avatarController);
router.get("/all", getAllAvatars);

export default router;
