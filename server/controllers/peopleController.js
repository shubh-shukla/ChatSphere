import { User } from "../models/userModel.js";

const peopleController = async (req, res) => {
  try {
    const users = await User.find({ verified: true }).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error in peopleController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export { peopleController };
