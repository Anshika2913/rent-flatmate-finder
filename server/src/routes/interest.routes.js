import express from "express";

import { create, getReceived, accept, decline, getSent } from "../controllers/interest.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/:listingId", authenticate, authorize("TENANT"), create);
router.get("/received", authenticate, authorize("OWNER"), getReceived);
router.patch("/:id/accept", authenticate, authorize("OWNER"), accept);
router.patch("/:id/decline", authenticate, authorize("OWNER"), decline);
router.get("/sent", authenticate, authorize("TENANT"), getSent);

export default router;