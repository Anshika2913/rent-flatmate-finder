import express from "express";

import {
  getConversationMessages,
  createMessage,
  ownerConversations,
  tenantConversations,
} from "../controllers/message.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/owner", authenticate, ownerConversations);

router.get("/tenant", authenticate, tenantConversations);

router.get("/:id", authenticate, getConversationMessages);

router.post("/:id", authenticate, createMessage);

export default router;