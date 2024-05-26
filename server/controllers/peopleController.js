import { User } from "../models/userModel.js";

const peopleController = async (req, res) => {
  const users = await User.find({ verified: true });
  res.json(users);
  // console.log(users);
};
export { peopleController };
