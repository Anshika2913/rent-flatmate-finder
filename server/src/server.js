import dotenv from "dotenv";
import http from "http";

import app from "./app.js";
import { initializeSocket } from "./socket/socket.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

app.use("/api/messages", messageRoutes);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});