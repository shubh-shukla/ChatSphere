// apiConfig.js
let baseUrl;
let socketUrl;

// if (import.meta.env.VITE_NODE_ENV === "production") {
  baseUrl = "https://my-chat-sphere.onrender.app";
  socketUrl = "wss://my-chat-sphere.onrender.app";
// } else {
  // baseUrl = "http://localhost:4000";
  // socketUrl = "ws://localhost:4000";
// }

export { baseUrl, socketUrl };
