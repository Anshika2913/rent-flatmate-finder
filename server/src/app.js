import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import interestRoutes from "./routes/interest.routes.js";
import compatibilityRoutes from "./routes/compatibility.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Rent & Flatmate Finder API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/compatibility", compatibilityRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

export default app;