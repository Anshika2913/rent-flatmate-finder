import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import listingRoutes from "./routes/listing.routes.js";

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

export default app;