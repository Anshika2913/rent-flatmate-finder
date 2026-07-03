import express from "express";
import { getAll } from "../controllers/conversation.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getAll);

export default router;