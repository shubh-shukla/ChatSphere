import WebSocket, { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";
import { Message } from "./models/messageModel.js";
import { User } from "./models/userModel.js";

const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (connection, req) => {
    const notifyAboutOnlinePeople = async () => {
      const onlineUsers = await Promise.all(
        Array.from(wss.clients)
          .filter((client) => client.userId)
          .map(async (client) => {
            const { userId, username } = client;
            const user = await User.findById(userId);
            const avatarLink = user ? user.avatarLink : null;

            return {
              userId,
              username,
              avatarLink,
            };
          })
      );

      [...wss.clients].forEach((client) => {
        client.send(
          JSON.stringify({
            online: onlineUsers,
          })
        );
      });
    };

    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
        console.log("dead");
      }, 1000);
    }, 5000);

    connection.on("pong", () => {
      clearTimeout(connection.deathTimer);
    });

    const cookies = req.headers.cookie;

    if (cookies) {
      const tokenString = cookies
        .split(";")
        .map((s) => s.trim())
        .find((str) => str.startsWith("authToken="));

      if (tokenString) {
        const token = tokenString.split("=")[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
          if (err) {
            console.log("WS JWT verify error:", err.message);
            return;
          }

          const { _id, firstName, lastName } = userData;
          connection.userId = _id;
          connection.username = `${firstName} ${lastName}`;

          // Notify everyone now that this client is authenticated
          notifyAboutOnlinePeople();
        });
      }
    }

    connection.on("message", async (message) => {
      let messageData;
      try {
        messageData = JSON.parse(message.toString());
      } catch (e) {
        console.error("WS: malformed message:", e.message);
        return;
      }
      const { recipient, text } = messageData;

      // Handle typing indicator events
      if ('typing' in messageData) {
        [...wss.clients].forEach((client) => {
          if (client.userId === messageData.recipient) {
            client.send(
              JSON.stringify({
                typing: messageData.typing,
                sender: connection.userId,
              })
            );
          }
        });
        return;
      }

      // Only save and relay if both recipient and text are present
      if (recipient && text) {
        const msgDoc = await Message.create({
          sender: connection.userId,
          recipient,
          text,
        });

        [...wss.clients].forEach((client) => {
          if (client.userId === recipient) {
            client.send(
              JSON.stringify({
                sender: connection.userId,
                text,
                _id: msgDoc._id,
                createdAt: msgDoc.createdAt,
              })
            );
          }
        });
      }
    });
    // Only notify after auth sets userId — the notify call is now inside jwt.verify callback
  });
};

export default createWebSocketServer;
