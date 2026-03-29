// apiConfig.js
let baseUrl;
let socketUrl;

console.log("VITE_SERVER_HOST:", import.meta.env.VITE_SERVER_HOST);
console.log("All env:", JSON.stringify(import.meta.env));

if (import.meta.env.VITE_SERVER_HOST) {
  baseUrl = `https://${import.meta.env.VITE_SERVER_HOST}`;
  socketUrl = `wss://${import.meta.env.VITE_SERVER_HOST}`;
} else {
  baseUrl = "http://localhost:4000";
  socketUrl = "ws://localhost:4000";
}

export { baseUrl, socketUrl };
