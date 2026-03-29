import protect from "../middleware/protect.js";
import { Message } from "../models/messageModel.js";

const messageController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId === 'undefined') {
      return res.status(400).json({ message: "Valid userId is required" });
    }

    const userData = await protect(req);
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const ourUserId = userData._id;

    const messages = await Message.find({
      sender: { $in: [userId, ourUserId] },
      recipient: { $in: [userId, ourUserId] },
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error in messageController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { messageController };
