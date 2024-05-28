import protect from "../middleware/protect.js";
import { Message } from "../models/messageModel.js";

const messageController = async (req, res) => {
  const { userId } = req.params;
  const userData = await protect(req);
  console.log("userData", userData);

  const ourUserId = userData._id;
  console.log("ourUserId", ourUserId);
  console.log("userId", userId);

  const messages = await Message.find({
    sender: { $in: [userId, ourUserId] },
    recipient: { $in: [userId, ourUserId] },
  }).sort({ createdAt: 1 });

  res.json(messages);
  console.log("messages", messages);
};

export { messageController };
