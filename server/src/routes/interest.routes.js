import express from "express";

import { create, getReceived, accept, decline } from "../controllers/interest.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/:listingId", authenticate, authorize("TENANT"), create);
router.get("/received", authenticate, authorize("OWNER"), getReceived);
router.patch("/:id/accept", authenticate, authorize("OWNER"), accept);
router.patch("/:id/decline", authenticate, authorize("OWNER"), decline);

export default router;