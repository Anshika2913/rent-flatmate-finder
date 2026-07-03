import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`⚡ User Connected: ${socket.id}`);

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);

      console.log(
        `Socket ${socket.id} joined conversation ${conversationId}`
      );

      socket.emit("joinedConversation", {
        conversationId,
      });
    });

    socket.on("disconnect", () => {
      console.log(`❌ User Disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => io;