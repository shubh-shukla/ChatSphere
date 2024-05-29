// apiConfig.js
let baseUrl;
let socketUrl;

// if (import.meta.env.VITE_NODE_ENV === "production") {
  baseUrl = "https://chatsphere-a821.onrender.com";
  socketUrl = "wss://chatsphere-a821.onrender.com";
// } else {
  // baseUrl = "http://localhost:4000";
  // socketUrl = "ws://localhost:4000";
// }

export { baseUrl, socketUrl };
