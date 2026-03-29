import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const verifyToken = (req) => {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.authToken;
    if (!token) return reject(new Error("No token"));
    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
      if (err) return reject(err);
      resolve(userData);
    });
  });
};

const profileController = async (req, res) => {
  try {
    const userData = await verifyToken(req);
    const user = await User.findById(userData._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error in profileController:", error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};

const profileUpdate = async (req, res) => {
  try {
    const userData = await verifyToken(req);
    const { firstName, lastName, avatarLink } = req.body;

    // Only allow updating own profile
    const user = await User.findById(userData._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (avatarLink !== undefined) user.avatarLink = avatarLink;
    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;
    res.json(safeUser);
  } catch (error) {
    console.error("Error in profileUpdate:", error.message);
    res.status(error.message === "No token" ? 401 : 500).json({ message: error.message || "Internal Server Error" });
  }
};

export { profileController, profileUpdate };
