import express from "express";
import {
  create,
  getAll,
} from "../controllers/message.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/:conversationId",
  authenticate,
  create
);

router.get(
  "/:conversationId",
  authenticate,
  getAll
);

export default router;