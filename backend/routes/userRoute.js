import express from "express";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";
import { verifyEmail } from "../controllers/emailVerifyController.js";
import { profileController, profileUpdate } from "../controllers/profileController.js";
import { messageController } from "../controllers/messageController.js";
import { peopleController } from "../controllers/peopleController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/:id/verify/:token", verifyEmail);
router.get("/profile", profileController);
router.get("/messages/:userId", messageController);
router.get("/people", peopleController);
router.put("/profile/update", profileUpdate);

export default router;
